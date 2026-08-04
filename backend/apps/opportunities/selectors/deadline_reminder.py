from apps.opportunities.models import DeadlineReminder


def deadline_reminder_exists(*, student, opportunity):
    """
    checks if a reminder has been sent to a student
    about a particular opportunity
    """ 
    return DeadlineReminder.objects.filter(
        student=student,
        opportunity=opportunity
    ).exists()