from django.conf import settings
from django.utils import timezone
from datetime import timedelta
from celery import shared_task
from apps.opportunities.models import SavedOpportunity
from apps.opportunities.selectors.deadline_reminder import deadline_reminder_exists
import resend



@shared_task
def send_deadline_reminder():
    """
    send email reminders to students who saved opportunities
    that are approaching their deadline
    """
    today = timezone.now()
    reminder_date = today + timedelta(days=7)

    saved_opportunities = (
        SavedOpportunity.objects
        .filter(opportunity__deadline__date=reminder_date.date())
        .select_related(
            'student',
            'opportunity'
        )
    )

    count = 0
    for saved_opportunity in saved_opportunities:
        student = saved_opportunity.student
        opportunity = saved_opportunity.opportunity
        
        if deadline_reminder_exists(student=student, opportunity=opportunity):
            continue

        subject = f'REMINDER: Your saved {opportunity.title} deadline is approaching!'
        msg = f"""
        Hi {student.first_name},

        The deadline for an opportunity you saved is 7 days away.
        
        Opportunity: {opportunity.title}
        Organisation: {opportunity.organisation}
        Deadline: {opportunity.deadline.strftime('%B %d, %Y')}
        
        Make sure you submit your application before the deadline.
        
        Good luck!"
        """
        
        params: resend.Emails.SendParams = {
        'from': settings.DEFAULT_FROM_EMAIL,
        'to': [student.email],
        'subject': subject,
        'text': msg,
        }

        resend.Emails.send(params)
        count += 1
        
        DeadlineReminder.objects.create(
            student=student,
            opportunity=opportunity
        )

    return f'{count} deadline reminders sent.'
