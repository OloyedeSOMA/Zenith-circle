from datetime import timedelta

from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils import timezone
from django.utils.text import slugify

from apps.users.models.user import User, UserRole
from apps.users.models.profile import RecruiterProfile

from apps.opportunities.models import (
    Opportunity,
    OpportunityField,
    OpportunityType,
    OpportunityStatus,
)


class Command(BaseCommand):
    help = "Clears and seeds recruiter, opportunity field, and opportunity data."

    RECRUITERS = [
        {
            "email": "recruitment@flutterwave.com",
            "first_name": "Flutterwave",
            "last_name": "Recruitment",
            "organisation": "Flutterwave",
            "description": (
                "Flutterwave is a financial technology company providing "
                "payment infrastructure for businesses across Africa."
            ),
            "website": "https://flutterwave.com",
            "location": "Lagos, Nigeria",
            "logo": "https://logos.hunter.io/flutterwave.com",
        },
        {
            "email": "careers@paystack.com",
            "first_name": "Paystack",
            "last_name": "Recruitment",
            "organisation": "Paystack",
            "description": (
                "Paystack is a technology company that helps businesses "
                "in Africa accept payments and build modern financial products."
            ),
            "website": "https://paystack.com",
            "location": "Lagos, Nigeria",
            "logo": "https://logos.hunter.io/paystack.com",
        },
        {
            "email": "careers@google.com",
            "first_name": "Google",
            "last_name": "Recruitment",
            "organisation": "Google",
            "description": (
                "Google is a global technology company building products "
                "and services used by people around the world."
            ),
            "website": "https://careers.google.com",
            "location": "Multiple Locations",
            "logo": "https://logos.hunter.io/google.com",
        },
        {
            "email": "careers@microsoft.com",
            "first_name": "Microsoft",
            "last_name": "Recruitment",
            "organisation": "Microsoft",
            "description": (
                "Microsoft develops software, cloud services, devices, "
                "and technology solutions used by organizations worldwide."
            ),
            "website": "https://careers.microsoft.com",
            "location": "Multiple Locations",
            "logo": "https://logos.hunter.io/microsoft.com",
        },
        {
            "email": "careers@andela.com",
            "first_name": "Andela",
            "last_name": "Recruitment",
            "organisation": "Andela",
            "description": (
                "Andela connects organizations with skilled technology "
                "professionals and engineering talent across global markets."
            ),
            "website": "https://andela.com",
            "location": "Remote",
            "logo": "https://logos.hunter.io/andela.com",
        },
        {
            "email": "careers@kpmg.com",
            "first_name": "KPMG",
            "last_name": "Recruitment",
            "organisation": "KPMG",
            "description": (
                "KPMG provides audit, tax, and advisory services to "
                "organizations across industries and markets."
            ),
            "website": "https://kpmg.com",
            "location": "Lagos, Nigeria",
            "logo": "https://logos.hunter.io/kpmg.com",
        },
        {
            "email": "careers@deloitte.com",
            "first_name": "Deloitte",
            "last_name": "Recruitment",
            "organisation": "Deloitte",
            "description": (
                "Deloitte provides audit, consulting, financial advisory, "
                "risk advisory, and tax services."
            ),
            "website": "https://www.deloitte.com",
            "location": "Lagos, Nigeria",
            "logo": "https://logos.hunter.io/deloitte.com",
        },
        {
            "email": "careers@pwc.com",
            "first_name": "PwC",
            "last_name": "Recruitment",
            "organisation": "PwC",
            "description": (
                "PwC provides assurance, tax, and consulting services "
                "to businesses and organizations worldwide."
            ),
            "website": "https://www.pwc.com",
            "location": "Lagos, Nigeria",
            "logo": "https://logos.hunter.io/pwc.com",
        },
        {
            "email": "careers@amazon.com",
            "first_name": "Amazon",
            "last_name": "Recruitment",
            "organisation": "Amazon",
            "description": (
                "Amazon is a global technology and commerce company "
                "operating across e-commerce, cloud computing, and digital services."
            ),
            "website": "https://www.amazon.jobs",
            "location": "Multiple Locations",
            "logo": "https://logos.hunter.io/amazon.com",
        },
        {
            "email": "careers@meta.com",
            "first_name": "Meta",
            "last_name": "Recruitment",
            "organisation": "Meta",
            "description": (
                "Meta builds social technology and products that help "
                "people connect and build communities."
            ),
            "website": "https://www.metacareers.com",
            "location": "Multiple Locations",
            "logo": "https://logos.hunter.io/meta.com",
        },
        {
            "email": "careers@shell.com",
            "first_name": "Shell",
            "last_name": "Recruitment",
            "organisation": "Shell",
            "description": (
                "Shell is an international energy company operating "
                "across energy production, trading, and technology."
            ),
            "website": "https://www.shell.com/careers",
            "location": "Lagos, Nigeria",
            "logo": "https://logos.hunter.io/shell.com",
        },
        {
            "email": "careers@unilever.com",
            "first_name": "Unilever",
            "last_name": "Recruitment",
            "organisation": "Unilever",
            "description": (
                "Unilever is a global consumer goods company with brands "
                "across beauty, wellbeing, personal care, and home care."
            ),
            "website": "https://careers.unilever.com",
            "location": "Multiple Locations",
            "logo": "https://logos.hunter.io/unilever.com",
        },
        {
            "email": "careers@mastercard.com",
            "first_name": "Mastercard",
            "last_name": "Recruitment",
            "organisation": "Mastercard",
            "description": (
                "Mastercard is a global payments technology company "
                "connecting consumers, businesses, and financial institutions."
            ),
            "website": "https://careers.mastercard.com",
            "location": "Multiple Locations",
            "logo": "https://logos.hunter.io/mastercard.com",
        },
        {
            "email": "careers@ey.com",
            "first_name": "EY",
            "last_name": "Recruitment",
            "organisation": "EY",
            "description": (
                "EY provides assurance, consulting, strategy, and tax "
                "services to organizations around the world."
            ),
            "website": "https://www.ey.com/en_gl/careers",
            "location": "Lagos, Nigeria",
            "logo": "https://logos.hunter.io/ey.com",
        },
        {
            "email": "careers@jpmorgan.com",
            "first_name": "JPMorgan",
            "last_name": "Recruitment",
            "organisation": "JPMorgan Chase",
            "description": (
                "JPMorgan Chase is a global financial services firm "
                "operating across banking, markets, and financial technology."
            ),
            "website": "https://www.jpmorganchase.com/careers",
            "location": "Multiple Locations",
            "logo": "https://logos.hunter.io/jpmorganchase.com",
        },
    ]

    FIELDS = [
        "Software Engineering",
        "Data Science",
        "Cybersecurity",
        "Cloud Computing",
        "Artificial Intelligence",
        "Product Management",
        "UI/UX Design",
        "Digital Marketing",
        "Marketing",
        "Accounting and Finance",
        "Business Administration",
        "Human Resources",
        "Law",
        "Medicine and Healthcare",
        "Engineering",
        "Environmental Science",
        "Research",
        "Education",
        "Media and Communications",
        "Public Policy",
    ]

    OPPORTUNITIES = [
        # ---------------------------------------------------------
        # SOFTWARE ENGINEERING - 6
        # ---------------------------------------------------------
        {
            "field": "Software Engineering",
            "title": "Software Engineering Intern",
            "organisation": "Google",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Join a software engineering internship program where you "
                "will work with experienced engineers on software development "
                "projects and gain practical experience with modern engineering practices."
            ),
            "url": "https://careers.google.com/jobs/results/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Software Engineering",
            "title": "Backend Engineer",
            "organisation": "Paystack",
            "type": OpportunityType.JOB,
            "description": (
                "Work with engineering teams to design, build, and maintain "
                "reliable backend systems that support financial technology products."
            ),
            "url": "https://paystack.com/jobs",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Software Engineering",
            "title": "Frontend Software Engineer",
            "organisation": "Flutterwave",
            "type": OpportunityType.JOB,
            "description": (
                "Build responsive and accessible web applications while working "
                "with product and engineering teams to deliver reliable user experiences."
            ),
            "url": "https://flutterwave.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Software Engineering",
            "title": "Software Developer Intern",
            "organisation": "Andela",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Gain practical software development experience while learning "
                "professional engineering workflows and collaborating with distributed teams."
            ),
            "url": "https://andela.com/careers/",
            "location": "Remote",
            "remote": True,
        },
        {
            "field": "Software Engineering",
            "title": "Graduate Software Engineer",
            "organisation": "Microsoft",
            "type": OpportunityType.JOB,
            "description": (
                "Begin your engineering career working with experienced teams "
                "to develop scalable software products and cloud-based solutions."
            ),
            "url": "https://careers.microsoft.com/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Software Engineering",
            "title": "Technology Graduate Programme",
            "organisation": "JPMorgan Chase",
            "type": OpportunityType.JOB,
            "description": (
                "Join a technology graduate program focused on software engineering, "
                "technology infrastructure, and digital financial services."
            ),
            "url": "https://www.jpmorganchase.com/careers",
            "location": "Multiple Locations",
            "remote": False,
        },

        # ---------------------------------------------------------
        # DATA SCIENCE - 6
        # ---------------------------------------------------------
        {
            "field": "Data Science",
            "title": "Data Science Intern",
            "organisation": "Microsoft",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Gain experience applying statistical analysis, data modeling, "
                "and machine learning techniques to practical business problems."
            ),
            "url": "https://careers.microsoft.com/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Data Science",
            "title": "Data Analyst",
            "organisation": "Flutterwave",
            "type": OpportunityType.JOB,
            "description": (
                "Analyze business and product data to generate insights that "
                "support decision-making across a fast-growing financial technology company."
            ),
            "url": "https://flutterwave.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Data Science",
            "title": "Data Analytics Graduate Opportunity",
            "organisation": "Deloitte",
            "type": OpportunityType.JOB,
            "description": (
                "Develop analytical skills while supporting consulting and business "
                "projects through data analysis and evidence-based insights."
            ),
            "url": "https://www.deloitte.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Data Science",
            "title": "Machine Learning Intern",
            "organisation": "Google",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Work alongside technical teams to explore machine learning methods "
                "and contribute to projects involving large-scale data."
            ),
            "url": "https://careers.google.com/jobs/results/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Data Science",
            "title": "Data Analyst Graduate Programme",
            "organisation": "KPMG",
            "type": OpportunityType.JOB,
            "description": (
                "Use analytical tools and structured problem-solving approaches "
                "to support client engagements and business decisions."
            ),
            "url": "https://kpmg.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Data Science",
            "title": "Data Science and Analytics Role",
            "organisation": "Amazon",
            "type": OpportunityType.JOB,
            "description": (
                "Apply analytical and quantitative skills to solve business problems "
                "and support data-driven decisions in a global technology organization."
            ),
            "url": "https://www.amazon.jobs/",
            "location": "Multiple Locations",
            "remote": True,
        },

        # ---------------------------------------------------------
        # CYBERSECURITY - 6
        # ---------------------------------------------------------
        {
            "field": "Cybersecurity",
            "title": "Cybersecurity Intern",
            "organisation": "Mastercard",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Gain exposure to cybersecurity operations, security controls, "
                "risk management, and technologies used to protect digital payment systems."
            ),
            "url": "https://careers.mastercard.com/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Cybersecurity",
            "title": "Security Analyst",
            "organisation": "Microsoft",
            "type": OpportunityType.JOB,
            "description": (
                "Support security monitoring and analysis while helping teams "
                "identify and respond to cybersecurity risks."
            ),
            "url": "https://careers.microsoft.com/",
            "location": "Multiple Locations",
            "remote": True,
        },
        {
            "field": "Cybersecurity",
            "title": "Information Security Graduate Role",
            "organisation": "Deloitte",
            "type": OpportunityType.JOB,
            "description": (
                "Work with cybersecurity professionals to assess risks, improve "
                "security processes, and support technology risk engagements."
            ),
            "url": "https://www.deloitte.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Cybersecurity",
            "title": "Cyber Risk Internship",
            "organisation": "KPMG",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Develop practical experience in cyber risk assessment, controls, "
                "governance, and information security advisory work."
            ),
            "url": "https://kpmg.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Cybersecurity",
            "title": "Security Engineering Opportunity",
            "organisation": "Google",
            "type": OpportunityType.JOB,
            "description": (
                "Join security engineering teams working to protect infrastructure, "
                "products, and users from evolving security threats."
            ),
            "url": "https://careers.google.com/jobs/results/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Cybersecurity",
            "title": "Technology Risk Analyst",
            "organisation": "PwC",
            "type": OpportunityType.JOB,
            "description": (
                "Support clients in understanding technology risks, controls, "
                "cybersecurity practices, and information security governance."
            ),
            "url": "https://www.pwc.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },

        # ---------------------------------------------------------
        # CLOUD COMPUTING - 6
        # ---------------------------------------------------------
        {
            "field": "Cloud Computing",
            "title": "Cloud Engineering Intern",
            "organisation": "Amazon",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Gain practical exposure to cloud infrastructure, distributed systems, "
                "and technologies used to build scalable applications."
            ),
            "url": "https://www.amazon.jobs/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Cloud Computing",
            "title": "Cloud Solutions Engineer",
            "organisation": "Microsoft",
            "type": OpportunityType.JOB,
            "description": (
                "Help organizations design and implement cloud solutions while "
                "working with modern infrastructure and cloud technologies."
            ),
            "url": "https://careers.microsoft.com/",
            "location": "Multiple Locations",
            "remote": True,
        },
        {
            "field": "Cloud Computing",
            "title": "Cloud Technology Graduate Programme",
            "organisation": "Deloitte",
            "type": OpportunityType.JOB,
            "description": (
                "Build consulting and technical skills while supporting organizations "
                "with cloud adoption and technology transformation."
            ),
            "url": "https://www.deloitte.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Cloud Computing",
            "title": "Cloud Support Associate",
            "organisation": "Google",
            "type": OpportunityType.JOB,
            "description": (
                "Support cloud customers and technical teams by investigating "
                "infrastructure issues and helping deliver reliable cloud services."
            ),
            "url": "https://careers.google.com/jobs/results/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Cloud Computing",
            "title": "Cloud Infrastructure Intern",
            "organisation": "Andela",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Learn practical cloud infrastructure concepts while working "
                "with distributed engineering teams and modern development workflows."
            ),
            "url": "https://andela.com/careers/",
            "location": "Remote",
            "remote": True,
        },
        {
            "field": "Cloud Computing",
            "title": "Technology Infrastructure Analyst",
            "organisation": "JPMorgan Chase",
            "type": OpportunityType.JOB,
            "description": (
                "Support technology infrastructure initiatives across a global "
                "financial services environment."
            ),
            "url": "https://www.jpmorganchase.com/careers",
            "location": "Multiple Locations",
            "remote": False,
        },

        # ---------------------------------------------------------
        # ARTIFICIAL INTELLIGENCE - 6
        # ---------------------------------------------------------
        {
            "field": "Artificial Intelligence",
            "title": "AI Research Intern",
            "organisation": "Google",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Explore artificial intelligence research topics and contribute "
                "to projects involving machine learning and intelligent systems."
            ),
            "url": "https://careers.google.com/jobs/results/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Artificial Intelligence",
            "title": "Machine Learning Engineer",
            "organisation": "Microsoft",
            "type": OpportunityType.JOB,
            "description": (
                "Build and deploy machine learning systems that support intelligent "
                "products and services at scale."
            ),
            "url": "https://careers.microsoft.com/",
            "location": "Multiple Locations",
            "remote": True,
        },
        {
            "field": "Artificial Intelligence",
            "title": "AI Product Internship",
            "organisation": "Flutterwave",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Support product teams exploring practical applications of artificial "
                "intelligence within financial technology products."
            ),
            "url": "https://flutterwave.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Artificial Intelligence",
            "title": "Applied AI Engineer",
            "organisation": "Amazon",
            "type": OpportunityType.JOB,
            "description": (
                "Develop applied artificial intelligence solutions that address "
                "practical customer and business challenges."
            ),
            "url": "https://www.amazon.jobs/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Artificial Intelligence",
            "title": "AI and Data Graduate Role",
            "organisation": "PwC",
            "type": OpportunityType.JOB,
            "description": (
                "Work with data and emerging technologies to support organizations "
                "as they explore artificial intelligence and digital transformation."
            ),
            "url": "https://www.pwc.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Artificial Intelligence",
            "title": "Machine Learning Research Opportunity",
            "organisation": "Meta",
            "type": OpportunityType.JOB,
            "description": (
                "Contribute to research and engineering projects involving machine "
                "learning, artificial intelligence, and large-scale computing."
            ),
            "url": "https://www.metacareers.com/",
            "location": "Multiple Locations",
            "remote": False,
        },

        # ---------------------------------------------------------
        # PRODUCT MANAGEMENT - 6
        # ---------------------------------------------------------
        {
            "field": "Product Management",
            "title": "Associate Product Manager Intern",
            "organisation": "Google",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Learn how product managers define user problems, prioritize features, "
                "and collaborate with engineering and design teams."
            ),
            "url": "https://careers.google.com/jobs/results/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Product Management",
            "title": "Product Manager",
            "organisation": "Flutterwave",
            "type": OpportunityType.JOB,
            "description": (
                "Work with cross-functional teams to define product strategy, "
                "understand customer needs, and deliver impactful financial products."
            ),
            "url": "https://flutterwave.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Product Management",
            "title": "Product Management Graduate Role",
            "organisation": "Microsoft",
            "type": OpportunityType.JOB,
            "description": (
                "Join product teams working across technology products and services "
                "while developing skills in product strategy and execution."
            ),
            "url": "https://careers.microsoft.com/",
            "location": "Multiple Locations",
            "remote": True,
        },
        {
            "field": "Product Management",
            "title": "Product Operations Intern",
            "organisation": "Paystack",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Support product operations by coordinating teams, analyzing feedback, "
                "and helping improve product delivery processes."
            ),
            "url": "https://paystack.com/jobs",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Product Management",
            "title": "Digital Product Analyst",
            "organisation": "Mastercard",
            "type": OpportunityType.JOB,
            "description": (
                "Analyze customer needs and product performance to support digital "
                "payments product development and strategy."
            ),
            "url": "https://careers.mastercard.com/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Product Management",
            "title": "Technology Product Consultant",
            "organisation": "Deloitte",
            "type": OpportunityType.JOB,
            "description": (
                "Support organizations with product strategy, technology transformation, "
                "and digital customer experience initiatives."
            ),
            "url": "https://www.deloitte.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },

        # ---------------------------------------------------------
        # UI/UX DESIGN - 6
        # ---------------------------------------------------------
        {
            "field": "UI/UX Design",
            "title": "Product Design Intern",
            "organisation": "Microsoft",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Work with designers and product teams to research user needs "
                "and create thoughtful digital experiences."
            ),
            "url": "https://careers.microsoft.com/",
            "location": "Multiple Locations",
            "remote": True,
        },
        {
            "field": "UI/UX Design",
            "title": "UX Designer",
            "organisation": "Flutterwave",
            "type": OpportunityType.JOB,
            "description": (
                "Design intuitive financial technology experiences by conducting "
                "user research and translating insights into effective interfaces."
            ),
            "url": "https://flutterwave.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "UI/UX Design",
            "title": "Product Designer",
            "organisation": "Paystack",
            "type": OpportunityType.JOB,
            "description": (
                "Collaborate with product and engineering teams to design clear, "
                "accessible, and useful digital payment experiences."
            ),
            "url": "https://paystack.com/jobs",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "UI/UX Design",
            "title": "Visual Design Internship",
            "organisation": "Google",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Explore visual design systems and contribute to digital products "
                "while learning from experienced design professionals."
            ),
            "url": "https://careers.google.com/jobs/results/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "UI/UX Design",
            "title": "UX Researcher",
            "organisation": "Meta",
            "type": OpportunityType.JOB,
            "description": (
                "Conduct research to understand user behavior and translate findings "
                "into insights that improve digital products."
            ),
            "url": "https://www.metacareers.com/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "UI/UX Design",
            "title": "Digital Experience Designer",
            "organisation": "PwC",
            "type": OpportunityType.JOB,
            "description": (
                "Help organizations improve customer experiences through research, "
                "design thinking, and digital experience development."
            ),
            "url": "https://www.pwc.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },

        # ---------------------------------------------------------
        # DIGITAL MARKETING - 6
        # ---------------------------------------------------------
        {
            "field": "Digital Marketing",
            "title": "Digital Marketing Intern",
            "organisation": "Unilever",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Support digital marketing campaigns, content initiatives, and "
                "audience engagement activities across consumer brands."
            ),
            "url": "https://careers.unilever.com/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Digital Marketing",
            "title": "Digital Marketing Specialist",
            "organisation": "Flutterwave",
            "type": OpportunityType.JOB,
            "description": (
                "Develop and execute digital marketing campaigns that grow brand "
                "awareness and customer engagement."
            ),
            "url": "https://flutterwave.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Digital Marketing",
            "title": "Content Marketing Associate",
            "organisation": "Paystack",
            "type": OpportunityType.JOB,
            "description": (
                "Create and coordinate content that communicates product value "
                "and supports customer education and engagement."
            ),
            "url": "https://paystack.com/jobs",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Digital Marketing",
            "title": "Social Media Intern",
            "organisation": "Mastercard",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Support social media content planning, publishing, and performance "
                "tracking across digital channels."
            ),
            "url": "https://careers.mastercard.com/",
            "location": "Multiple Locations",
            "remote": True,
        },
        {
            "field": "Digital Marketing",
            "title": "Growth Marketing Associate",
            "organisation": "Andela",
            "type": OpportunityType.JOB,
            "description": (
                "Support growth initiatives through digital campaigns, audience "
                "research, experimentation, and performance analysis."
            ),
            "url": "https://andela.com/careers/",
            "location": "Remote",
            "remote": True,
        },
        {
            "field": "Digital Marketing",
            "title": "Marketing Communications Graduate Role",
            "organisation": "Deloitte",
            "type": OpportunityType.JOB,
            "description": (
                "Support marketing communications and digital engagement initiatives "
                "for a professional services organization."
            ),
            "url": "https://www.deloitte.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },

        # ---------------------------------------------------------
        # MARKETING - 6
        # ---------------------------------------------------------
        {
            "field": "Marketing",
            "title": "Marketing Intern",
            "organisation": "Unilever",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Gain practical experience supporting brand strategy, market research, "
                "consumer insights, and marketing campaigns."
            ),
            "url": "https://careers.unilever.com/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Marketing",
            "title": "Brand Marketing Associate",
            "organisation": "Mastercard",
            "type": OpportunityType.JOB,
            "description": (
                "Support brand marketing programs and campaigns that strengthen "
                "customer relationships and market presence."
            ),
            "url": "https://careers.mastercard.com/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Marketing",
            "title": "Marketing Graduate Programme",
            "organisation": "KPMG",
            "type": OpportunityType.JOB,
            "description": (
                "Develop marketing and communications experience while supporting "
                "business development and client engagement activities."
            ),
            "url": "https://kpmg.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Marketing",
            "title": "Consumer Marketing Intern",
            "organisation": "Shell",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Support consumer-focused marketing activities and gain experience "
                "in market analysis and campaign execution."
            ),
            "url": "https://www.shell.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Marketing",
            "title": "Marketing Analyst",
            "organisation": "Amazon",
            "type": OpportunityType.JOB,
            "description": (
                "Analyze marketing performance and customer behavior to support "
                "data-informed marketing strategies."
            ),
            "url": "https://www.amazon.jobs/",
            "location": "Multiple Locations",
            "remote": True,
        },
        {
            "field": "Marketing",
            "title": "Marketing and Communications Consultant",
            "organisation": "PwC",
            "type": OpportunityType.JOB,
            "description": (
                "Support marketing strategy, communications, and client engagement "
                "initiatives across professional services."
            ),
            "url": "https://www.pwc.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },

        # ---------------------------------------------------------
        # ACCOUNTING AND FINANCE - 6
        # ---------------------------------------------------------
        {
            "field": "Accounting and Finance",
            "title": "Audit Intern",
            "organisation": "KPMG",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Gain practical experience supporting audit engagements and "
                "developing knowledge of financial reporting and controls."
            ),
            "url": "https://kpmg.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Accounting and Finance",
            "title": "Financial Analyst",
            "organisation": "JPMorgan Chase",
            "type": OpportunityType.JOB,
            "description": (
                "Analyze financial information and support business decisions "
                "within a global financial services organization."
            ),
            "url": "https://www.jpmorganchase.com/careers",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Accounting and Finance",
            "title": "Finance Graduate Programme",
            "organisation": "Deloitte",
            "type": OpportunityType.JOB,
            "description": (
                "Develop professional finance skills while working with experienced "
                "teams on financial analysis and advisory projects."
            ),
            "url": "https://www.deloitte.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Accounting and Finance",
            "title": "Tax Internship",
            "organisation": "PwC",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Support tax professionals with research, analysis, and client "
                "engagements while gaining practical experience."
            ),
            "url": "https://www.pwc.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Accounting and Finance",
            "title": "Corporate Finance Analyst",
            "organisation": "Mastercard",
            "type": OpportunityType.JOB,
            "description": (
                "Support financial planning, analysis, and business performance "
                "activities within a global payments organization."
            ),
            "url": "https://careers.mastercard.com/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Accounting and Finance",
            "title": "Accounting Associate",
            "organisation": "EY",
            "type": OpportunityType.JOB,
            "description": (
                "Work with accounting professionals on financial reporting, "
                "assurance, and client service engagements."
            ),
            "url": "https://www.ey.com/en_gl/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },

        # ---------------------------------------------------------
        # BUSINESS ADMINISTRATION - 6
        # ---------------------------------------------------------
        {
            "field": "Business Administration",
            "title": "Business Analyst Intern",
            "organisation": "Deloitte",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Support business analysis activities and help teams understand "
                "operational challenges and opportunities for improvement."
            ),
            "url": "https://www.deloitte.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Business Administration",
            "title": "Business Operations Associate",
            "organisation": "Flutterwave",
            "type": OpportunityType.JOB,
            "description": (
                "Support operational processes and cross-functional initiatives "
                "within a growing financial technology organization."
            ),
            "url": "https://flutterwave.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Business Administration",
            "title": "Graduate Business Programme",
            "organisation": "KPMG",
            "type": OpportunityType.JOB,
            "description": (
                "Develop business and professional skills while supporting "
                "client engagements and organizational initiatives."
            ),
            "url": "https://kpmg.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Business Administration",
            "title": "Business Operations Intern",
            "organisation": "Paystack",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Assist with business operations and learn how teams coordinate "
                "to deliver financial technology products and services."
            ),
            "url": "https://paystack.com/jobs",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Business Administration",
            "title": "Strategy and Operations Analyst",
            "organisation": "Mastercard",
            "type": OpportunityType.JOB,
            "description": (
                "Analyze business performance and support strategic initiatives "
                "across a global payments organization."
            ),
            "url": "https://careers.mastercard.com/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Business Administration",
            "title": "Business Consulting Graduate Role",
            "organisation": "PwC",
            "type": OpportunityType.JOB,
            "description": (
                "Support consulting projects and help organizations improve "
                "operations, strategy, and business performance."
            ),
            "url": "https://www.pwc.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },

        # ---------------------------------------------------------
        # HUMAN RESOURCES - 6
        # ---------------------------------------------------------
        {
            "field": "Human Resources",
            "title": "Human Resources Intern",
            "organisation": "Unilever",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Support recruitment, employee engagement, and people operations "
                "activities within a global organization."
            ),
            "url": "https://careers.unilever.com/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Human Resources",
            "title": "People Operations Associate",
            "organisation": "Andela",
            "type": OpportunityType.JOB,
            "description": (
                "Support employee experience and people operations initiatives "
                "within a distributed technology organization."
            ),
            "url": "https://andela.com/careers/",
            "location": "Remote",
            "remote": True,
        },
        {
            "field": "Human Resources",
            "title": "HR Graduate Programme",
            "organisation": "KPMG",
            "type": OpportunityType.JOB,
            "description": (
                "Develop human resources experience across talent management, "
                "employee relations, and people development."
            ),
            "url": "https://kpmg.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Human Resources",
            "title": "Talent Acquisition Intern",
            "organisation": "Flutterwave",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Support recruitment activities including candidate coordination, "
                "sourcing, and employer branding initiatives."
            ),
            "url": "https://flutterwave.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Human Resources",
            "title": "People Analytics Analyst",
            "organisation": "Microsoft",
            "type": OpportunityType.JOB,
            "description": (
                "Use data and analytical methods to support workforce planning "
                "and people-related decision-making."
            ),
            "url": "https://careers.microsoft.com/",
            "location": "Multiple Locations",
            "remote": True,
        },
        {
            "field": "Human Resources",
            "title": "Talent Management Consultant",
            "organisation": "Deloitte",
            "type": OpportunityType.JOB,
            "description": (
                "Support organizations with talent strategy, workforce planning, "
                "and employee development initiatives."
            ),
            "url": "https://www.deloitte.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },

        # ---------------------------------------------------------
        # LAW - 6
        # ---------------------------------------------------------
        {
            "field": "Law",
            "title": "Legal Intern",
            "organisation": "Flutterwave",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Support legal teams with research, documentation, and commercial "
                "legal activities within a financial technology environment."
            ),
            "url": "https://flutterwave.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Law",
            "title": "Legal Graduate Opportunity",
            "organisation": "KPMG",
            "type": OpportunityType.JOB,
            "description": (
                "Work with professional services teams on legal and regulatory "
                "matters affecting businesses and organizations."
            ),
            "url": "https://kpmg.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Law",
            "title": "Corporate Legal Analyst",
            "organisation": "Microsoft",
            "type": OpportunityType.JOB,
            "description": (
                "Support corporate legal activities involving technology, contracts, "
                "regulatory matters, and business operations."
            ),
            "url": "https://careers.microsoft.com/",
            "location": "Multiple Locations",
            "remote": True,
        },
        {
            "field": "Law",
            "title": "Legal Research Intern",
            "organisation": "PwC",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Conduct legal and regulatory research and support professional "
                "teams working on client matters."
            ),
            "url": "https://www.pwc.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Law",
            "title": "Compliance Analyst",
            "organisation": "Mastercard",
            "type": OpportunityType.JOB,
            "description": (
                "Support compliance and regulatory activities across a global "
                "payments and financial technology environment."
            ),
            "url": "https://careers.mastercard.com/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Law",
            "title": "Legal Counsel Opportunity",
            "organisation": "JPMorgan Chase",
            "type": OpportunityType.JOB,
            "description": (
                "Support legal matters related to financial services, regulatory "
                "requirements, and business operations."
            ),
            "url": "https://www.jpmorganchase.com/careers",
            "location": "Multiple Locations",
            "remote": False,
        },

        # ---------------------------------------------------------
        # MEDICINE AND HEALTHCARE - 6
        # ---------------------------------------------------------
        {
            "field": "Medicine and Healthcare",
            "title": "Healthcare Research Intern",
            "organisation": "Google",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Support research initiatives exploring technology, data, and "
                "innovative approaches to healthcare challenges."
            ),
            "url": "https://careers.google.com/jobs/results/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Medicine and Healthcare",
            "title": "Healthcare Data Analyst",
            "organisation": "Microsoft",
            "type": OpportunityType.JOB,
            "description": (
                "Analyze healthcare-related data and support technology initiatives "
                "designed to improve health outcomes and services."
            ),
            "url": "https://careers.microsoft.com/",
            "location": "Multiple Locations",
            "remote": True,
        },
        {
            "field": "Medicine and Healthcare",
            "title": "Public Health Internship",
            "organisation": "Shell",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Support health and wellbeing initiatives and gain practical experience "
                "in organizational health programs."
            ),
            "url": "https://www.shell.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Medicine and Healthcare",
            "title": "Healthcare Consultant",
            "organisation": "Deloitte",
            "type": OpportunityType.JOB,
            "description": (
                "Support healthcare organizations with strategy, transformation, "
                "operations, and technology-related initiatives."
            ),
            "url": "https://www.deloitte.com/careers",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Medicine and Healthcare",
            "title": "Health Technology Analyst",
            "organisation": "PwC",
            "type": OpportunityType.JOB,
            "description": (
                "Support healthcare clients with technology analysis, digital "
                "transformation, and operational improvement initiatives."
            ),
            "url": "https://www.pwc.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Medicine and Healthcare",
            "title": "Healthcare Operations Intern",
            "organisation": "KPMG",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Gain experience supporting healthcare operations and advisory "
                "projects focused on improving organizational performance."
            ),
            "url": "https://kpmg.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },

        # ---------------------------------------------------------
        # ENGINEERING - 6
        # ---------------------------------------------------------
        {
            "field": "Engineering",
            "title": "Engineering Intern",
            "organisation": "Shell",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Gain practical engineering experience while working alongside "
                "experienced professionals in the energy industry."
            ),
            "url": "https://www.shell.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Engineering",
            "title": "Graduate Engineering Programme",
            "organisation": "Shell",
            "type": OpportunityType.JOB,
            "description": (
                "Develop technical and professional skills through a structured "
                "engineering career opportunity in the energy sector."
            ),
            "url": "https://www.shell.com/careers",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Engineering",
            "title": "Mechanical Engineering Intern",
            "organisation": "Unilever",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Support engineering and manufacturing operations while gaining "
                "practical experience in a global consumer goods organization."
            ),
            "url": "https://careers.unilever.com/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Engineering",
            "title": "Electrical Engineering Graduate Role",
            "organisation": "Microsoft",
            "type": OpportunityType.JOB,
            "description": (
                "Apply engineering knowledge to technology infrastructure, "
                "systems, and large-scale technical environments."
            ),
            "url": "https://careers.microsoft.com/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Engineering",
            "title": "Process Engineering Opportunity",
            "organisation": "Shell",
            "type": OpportunityType.JOB,
            "description": (
                "Support process engineering activities focused on operational "
                "performance, safety, and technical improvement."
            ),
            "url": "https://www.shell.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Engineering",
            "title": "Engineering Consulting Graduate Programme",
            "organisation": "Deloitte",
            "type": OpportunityType.JOB,
            "description": (
                "Apply technical and analytical skills to consulting projects "
                "involving engineering and technology transformation."
            ),
            "url": "https://www.deloitte.com/careers",
            "location": "Multiple Locations",
            "remote": False,
        },

        # ---------------------------------------------------------
        # ENVIRONMENTAL SCIENCE - 6
        # ---------------------------------------------------------
        {
            "field": "Environmental Science",
            "title": "Environmental Science Intern",
            "organisation": "Shell",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Support environmental assessments and sustainability initiatives "
                "within an international energy organization."
            ),
            "url": "https://www.shell.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Environmental Science",
            "title": "Environmental Analyst",
            "organisation": "Deloitte",
            "type": OpportunityType.JOB,
            "description": (
                "Support clients with environmental analysis, sustainability strategy, "
                "and responsible business initiatives."
            ),
            "url": "https://www.deloitte.com/careers",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Environmental Science",
            "title": "Sustainability Graduate Programme",
            "organisation": "Unilever",
            "type": OpportunityType.JOB,
            "description": (
                "Contribute to sustainability initiatives focused on environmental "
                "impact, responsible sourcing, and business transformation."
            ),
            "url": "https://careers.unilever.com/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Environmental Science",
            "title": "Climate Research Intern",
            "organisation": "Microsoft",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Support research and technology initiatives addressing climate "
                "change and environmental sustainability."
            ),
            "url": "https://careers.microsoft.com/",
            "location": "Multiple Locations",
            "remote": True,
        },
        {
            "field": "Environmental Science",
            "title": "Environmental Risk Consultant",
            "organisation": "KPMG",
            "type": OpportunityType.JOB,
            "description": (
                "Support organizations in identifying environmental risks and "
                "developing sustainability and risk management strategies."
            ),
            "url": "https://kpmg.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Environmental Science",
            "title": "Sustainability Analyst",
            "organisation": "PwC",
            "type": OpportunityType.JOB,
            "description": (
                "Analyze sustainability performance and support organizations "
                "with environmental and climate-related initiatives."
            ),
            "url": "https://www.pwc.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },

        # ---------------------------------------------------------
        # RESEARCH - 6
        # ---------------------------------------------------------
        {
            "field": "Research",
            "title": "Research Intern",
            "organisation": "Google",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Support research projects by conducting analysis, reviewing "
                "literature, and contributing to experimental work."
            ),
            "url": "https://careers.google.com/jobs/results/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Research",
            "title": "Technology Research Analyst",
            "organisation": "Microsoft",
            "type": OpportunityType.JOB,
            "description": (
                "Conduct research and analysis on emerging technologies and "
                "their potential applications across industries."
            ),
            "url": "https://careers.microsoft.com/",
            "location": "Multiple Locations",
            "remote": True,
        },
        {
            "field": "Research",
            "title": "Market Research Intern",
            "organisation": "Mastercard",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Support market research activities and analyze consumer and "
                "industry trends within the global payments sector."
            ),
            "url": "https://careers.mastercard.com/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Research",
            "title": "Research Analyst",
            "organisation": "PwC",
            "type": OpportunityType.JOB,
            "description": (
                "Conduct structured research and analysis to support consulting "
                "and business advisory engagements."
            ),
            "url": "https://www.pwc.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Research",
            "title": "Business Research Graduate Role",
            "organisation": "Deloitte",
            "type": OpportunityType.JOB,
            "description": (
                "Support research initiatives that help organizations understand "
                "markets, industries, and emerging business trends."
            ),
            "url": "https://www.deloitte.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Research",
            "title": "Research and Insights Associate",
            "organisation": "Unilever",
            "type": OpportunityType.JOB,
            "description": (
                "Support consumer research and insights initiatives that inform "
                "marketing, product, and business decisions."
            ),
            "url": "https://careers.unilever.com/",
            "location": "Multiple Locations",
            "remote": False,
        },

        # ---------------------------------------------------------
        # EDUCATION - 6
        # ---------------------------------------------------------
        {
            "field": "Education",
            "title": "Education Programme Intern",
            "organisation": "Microsoft",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Support education-focused technology and digital learning initiatives "
                "designed to improve access to learning resources."
            ),
            "url": "https://careers.microsoft.com/",
            "location": "Multiple Locations",
            "remote": True,
        },
        {
            "field": "Education",
            "title": "Education Technology Associate",
            "organisation": "Google",
            "type": OpportunityType.JOB,
            "description": (
                "Support initiatives that use technology to improve learning "
                "experiences and educational outcomes."
            ),
            "url": "https://careers.google.com/jobs/results/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Education",
            "title": "Learning and Development Intern",
            "organisation": "Deloitte",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Support learning programs and professional development initiatives "
                "within a global professional services organization."
            ),
            "url": "https://www.deloitte.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Education",
            "title": "Education Programme Coordinator",
            "organisation": "Andela",
            "type": OpportunityType.JOB,
            "description": (
                "Coordinate learning and development programs that support "
                "technology professionals and distributed teams."
            ),
            "url": "https://andela.com/careers/",
            "location": "Remote",
            "remote": True,
        },
        {
            "field": "Education",
            "title": "Digital Learning Specialist",
            "organisation": "PwC",
            "type": OpportunityType.JOB,
            "description": (
                "Support digital learning initiatives and help organizations "
                "develop effective training and knowledge programs."
            ),
            "url": "https://www.pwc.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Education",
            "title": "Learning Experience Intern",
            "organisation": "Unilever",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Support employee learning initiatives and contribute to programs "
                "that improve professional development experiences."
            ),
            "url": "https://careers.unilever.com/",
            "location": "Multiple Locations",
            "remote": False,
        },

        # ---------------------------------------------------------
        # MEDIA AND COMMUNICATIONS - 6
        # ---------------------------------------------------------
        {
            "field": "Media and Communications",
            "title": "Communications Intern",
            "organisation": "Mastercard",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Support communications campaigns, media activities, and content "
                "development within a global payments organization."
            ),
            "url": "https://careers.mastercard.com/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Media and Communications",
            "title": "Corporate Communications Associate",
            "organisation": "Flutterwave",
            "type": OpportunityType.JOB,
            "description": (
                "Support corporate communications and storytelling initiatives "
                "across a growing financial technology company."
            ),
            "url": "https://flutterwave.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Media and Communications",
            "title": "Content Communications Specialist",
            "organisation": "Andela",
            "type": OpportunityType.JOB,
            "description": (
                "Create and coordinate communications content for technology "
                "professionals and global audiences."
            ),
            "url": "https://andela.com/careers/",
            "location": "Remote",
            "remote": True,
        },
        {
            "field": "Media and Communications",
            "title": "Media Relations Intern",
            "organisation": "Deloitte",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Support media relations activities, communications research, "
                "and corporate storytelling initiatives."
            ),
            "url": "https://www.deloitte.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Media and Communications",
            "title": "Corporate Affairs Analyst",
            "organisation": "Shell",
            "type": OpportunityType.JOB,
            "description": (
                "Support corporate affairs, stakeholder engagement, and communications "
                "activities within the energy sector."
            ),
            "url": "https://www.shell.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Media and Communications",
            "title": "Communications Graduate Programme",
            "organisation": "Unilever",
            "type": OpportunityType.JOB,
            "description": (
                "Develop communications experience while supporting internal, external, "
                "and brand communications initiatives."
            ),
            "url": "https://careers.unilever.com/",
            "location": "Multiple Locations",
            "remote": False,
        },

        # ---------------------------------------------------------
        # PUBLIC POLICY - 6
        # ---------------------------------------------------------
        {
            "field": "Public Policy",
            "title": "Public Policy Intern",
            "organisation": "Google",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Support public policy research and analysis on issues affecting "
                "technology, digital services, and society."
            ),
            "url": "https://careers.google.com/jobs/results/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Public Policy",
            "title": "Technology Policy Analyst",
            "organisation": "Microsoft",
            "type": OpportunityType.JOB,
            "description": (
                "Analyze technology policy developments and support engagement "
                "with stakeholders on digital policy issues."
            ),
            "url": "https://careers.microsoft.com/",
            "location": "Multiple Locations",
            "remote": True,
        },
        {
            "field": "Public Policy",
            "title": "Public Affairs Intern",
            "organisation": "Mastercard",
            "type": OpportunityType.INTERNSHIP,
            "description": (
                "Support public affairs and policy initiatives related to digital "
                "payments and financial inclusion."
            ),
            "url": "https://careers.mastercard.com/",
            "location": "Multiple Locations",
            "remote": False,
        },
        {
            "field": "Public Policy",
            "title": "Policy Research Analyst",
            "organisation": "PwC",
            "type": OpportunityType.JOB,
            "description": (
                "Conduct policy research and analysis to support organizations "
                "navigating regulatory and public policy environments."
            ),
            "url": "https://www.pwc.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Public Policy",
            "title": "Government Relations Graduate Role",
            "organisation": "Shell",
            "type": OpportunityType.JOB,
            "description": (
                "Support government relations and stakeholder engagement activities "
                "within an international energy organization."
            ),
            "url": "https://www.shell.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
        {
            "field": "Public Policy",
            "title": "Public Sector Consulting Opportunity",
            "organisation": "Deloitte",
            "type": OpportunityType.JOB,
            "description": (
                "Support public sector organizations with policy analysis, strategy, "
                "technology transformation, and service improvement initiatives."
            ),
            "url": "https://www.deloitte.com/careers",
            "location": "Lagos, Nigeria",
            "remote": False,
        },
    ]

    @transaction.atomic
    def handle(self, *args, **options):
        self.stdout.write(
            self.style.WARNING(
                "Clearing existing recruiter and opportunity seed data..."
            )
        )

        # Delete opportunities first because posted_by uses PROTECT.
        Opportunity.objects.all().delete()

        # Delete opportunity fields after opportunities.
        OpportunityField.objects.all().delete()

        # Delete recruiter profiles before recruiter users.
        RecruiterProfile.objects.filter(
            user__role=UserRole.RECRUITER
        ).delete()

        # Only delete recruiter users.
        # Student users and student profiles are preserved.
        User.objects.filter(
            role=UserRole.RECRUITER
        ).delete()

        self.stdout.write(
            self.style.SUCCESS(
                "Old recruiter, opportunity, and opportunity field data cleared."
            )
        )

        # ---------------------------------------------------------
        # CREATE RECRUITERS
        # ---------------------------------------------------------
        self.stdout.write("Creating recruiter users and profiles...")

        recruiters = {}

        for recruiter_data in self.RECRUITERS:
            user = User.objects.create_user(
                email=recruiter_data["email"],
                first_name=recruiter_data["first_name"],
                last_name=recruiter_data["last_name"],
                password="Password123!",
                role=UserRole.RECRUITER,
                is_active=True,
                is_verified=True,
            )

            RecruiterProfile.objects.create(
                user=user,
                organisation=recruiter_data["organisation"],
                description=recruiter_data["description"],
                website=recruiter_data["website"],
                location=recruiter_data["location"],
                logo=recruiter_data["logo"],
            )

            recruiters[recruiter_data["organisation"]] = user

        self.stdout.write(
            self.style.SUCCESS(
                f"Created {len(recruiters)} recruiter users and profiles."
            )
        )

        # ---------------------------------------------------------
        # CREATE OPPORTUNITY FIELDS
        # ---------------------------------------------------------
        self.stdout.write("Creating opportunity fields...")

        fields = {}

        for field_name in self.FIELDS:
            field = OpportunityField.objects.create(
                name=field_name,
                slug=slugify(field_name),
            )

            fields[field_name] = field

        self.stdout.write(
            self.style.SUCCESS(
                f"Created {len(fields)} opportunity fields."
            )
        )

        # ---------------------------------------------------------
        # CREATE OPPORTUNITIES
        # ---------------------------------------------------------
        self.stdout.write("Creating opportunities...")

        created_opportunities = 0
        now = timezone.now()

        for opportunity_data in self.OPPORTUNITIES:
            organisation = opportunity_data["organisation"]

            posted_by = recruiters.get(organisation)

            if not posted_by:
                self.stdout.write(
                    self.style.WARNING(
                        f"Skipping opportunity because recruiter "
                        f"was not found: {organisation}"
                    )
                )
                continue

            field = fields[opportunity_data["field"]]

            deadline = now + timedelta(
                days=60 + created_opportunities
            )

            base_slug = slugify(
                f"{opportunity_data['title']}-{organisation}"
            )

            slug = base_slug
            counter = 1

            while Opportunity.objects.filter(
                slug=slug
            ).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1

            Opportunity.objects.create(
                title=opportunity_data["title"],
                slug=slug,
                description=opportunity_data["description"],
                opportunity_type=opportunity_data["type"],
                organisation=organisation,
                application_url=opportunity_data["url"],
                location=opportunity_data["location"],
                field=field,
                deadline=deadline,
                is_remote=opportunity_data["remote"],
                status=OpportunityStatus.APPROVED,
                posted_by=posted_by,
                approved_by=posted_by,
                approved_at=now,
            )

            created_opportunities += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Created {created_opportunities} opportunities."
            )
        )

        # ---------------------------------------------------------
        # VERIFY DATA DISTRIBUTION
        # ---------------------------------------------------------
        self.stdout.write(
            "Verifying opportunity distribution by field..."
        )

        invalid_fields = []

        for field_name, field in fields.items():
            count = Opportunity.objects.filter(
                field=field
            ).count()

            if count < 6:
                invalid_fields.append(
                    f"{field_name}: {count}"
                )

        if invalid_fields:
            self.stdout.write(
                self.style.ERROR(
                    "Some fields have fewer than 6 opportunities:"
                )
            )

            for invalid_field in invalid_fields:
                self.stdout.write(
                    self.style.ERROR(
                        f"  - {invalid_field}"
                    )
                )

            return

        self.stdout.write(
            self.style.SUCCESS(
                "Every opportunity field has at least 6 opportunities."
            )
        )

        self.stdout.write(
            self.style.SUCCESS(
                "Seed process completed successfully."
            )
        )

        self.stdout.write(
            self.style.SUCCESS(
                f"Recruiters: {len(recruiters)}"
            )
        )

        self.stdout.write(
            self.style.SUCCESS(
                f"Opportunity fields: {len(fields)}"
            )
        )

        self.stdout.write(
            self.style.SUCCESS(
                f"Opportunities: {created_opportunities}"
            )
        )
