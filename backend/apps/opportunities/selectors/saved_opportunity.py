from apps.opportunities.models import SavedOpportunity



def check_if_saved_opportunity_exists(*, student, opportunity):
    """
    checks if the student has already saved
    the opportunity
    """
    return SavedOpportunity.objects.filter(
        student=student,
        opportunity=opportunity
    ).exists()



def get_student_saved_opportunities(*, student):
    """
    return all opportunities saved/bookmarked by the student
    """
    return (
        SavedOpportunity.objects
        .filter(student=student)
        .select_related(
            'opportunity',
            'opportunity__field',
        )
    )


def get_saved_opportunity(*, student, opportunity):
    """
    returns a saved opportunity
    """
    return (
        SavedOpportunity.objects
        .filter(
            student=student,
            opportunity=opportunity
        )
        .select_related(
            'opportunity',
            'opportunity__field'
        )
    ).first()