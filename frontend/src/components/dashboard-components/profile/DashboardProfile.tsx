"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  useRecruiterProfile,
  useStudentProfile,
} from "@/hooks/useProfile";
import ProfileHeader from "./ProfileHeader";
import AccountInformation from "./AccountInformation";
import EducationCard from "./EducationCard";
import SkillsCard from "./SkillsCard";
import ProfileEditModal from "./ProfileEditModal";

interface DashboardProfileProps {
  role: "student" | "recruiter";
}

export default function DashboardProfile({
  role,
}: DashboardProfileProps) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);

  const studentQuery = useStudentProfile(role === "student");
  const recruiterQuery = useRecruiterProfile(role === "recruiter");

  const query = role === "student" ? studentQuery : recruiterQuery;

  const profile =
    role === "student"
      ? studentQuery.data
      : recruiterQuery.data;

  useEffect(() => {
    if (query.isError) {
      router.push(
        role === "student"
          ? "/student-profile"
          : "/recruiter-profile"
      );
    }
  }, [query.isError, role, router]);

  if (query.isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-base text-[#70696b]">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  // STUDENT PROFILE
  if (role === "student") {
    const name = studentQuery.data?.display_name || "Student";
    const email = studentQuery.data?.email || "—";
    const photo = studentQuery.data?.profile_photo || null;
    const institution = studentQuery.data?.institution || "—";
    const course = studentQuery.data?.course_of_study || "—";
    const level = studentQuery.data?.current_level || "—";
    const graduation =
      studentQuery.data?.expected_graduation || "—";
    const skills = studentQuery.data?.skills || [];

    return (
      <>
        <div className="flex flex-col gap-5">
          {/* Page heading */}
          <div>
            <h1 className="text-xl font-bold text-[#1f1f1f]">
              My Profile
            </h1>

            <p className="mt-1 text-sm text-[#70696b]">
              Manage your personal information
            </p>
          </div>

          {/* Profile header */}
          <ProfileHeader
            name={name}
            email={email}
            image={photo}
            subtitle={`${institution} • ${course}`}
            onEdit={() => setEditOpen(true)}
          />

          {/* Account information */}
          <AccountInformation
            items={[
              {
                label: "Full Name",
                value: name,
              },
              {
                label: "Email Address",
                value: email,
              },
              {
                label: "Institution",
                value: institution,
              },
              {
                label: "Course",
                value: course,
              },
              {
                label: "Current Level",
                value: level,
              },
              {
                label: "Expected Graduation",
                value: graduation,
              },
            ]}
          />

          {/* Education */}
          <EducationCard
            institution={institution}
            course={course}
            level={level}
            graduation={graduation}
          />

          {/* Skills */}
          <SkillsCard skills={skills} />
        </div>

        <ProfileEditModal
          open={editOpen}
          role="student"
          studentProfile={studentQuery.data}
          onClose={() => setEditOpen(false)}
        />
      </>
    );
  }

  // RECRUITER PROFILE
  const organisation =
    recruiterQuery.data?.organisation || "Organisation";

  const description =
    recruiterQuery.data?.description || "";

  const website = recruiterQuery.data?.website || "—";
  const location = recruiterQuery.data?.location || "—";
  const logo = recruiterQuery.data?.logo || null;

  return (
    <>
      <div className="flex flex-col gap-5">
        {/* Page heading */}
        <div>
          <h1 className="text-xl font-bold text-[#1f1f1f]">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-[#70696b]">
            Manage your organisation information
          </p>
        </div>

        {/* Profile header */}
        <ProfileHeader
          name={organisation}
          email={website}
          image={logo}
          subtitle={location}
          onEdit={() => setEditOpen(true)}
        />

        {/* Account information */}
        <AccountInformation
          items={[
            {
              label: "Organisation",
              value: organisation,
            },
            {
              label: "Description",
              value: description,
            },
            {
              label: "Website",
              value: website,
            },
            {
              label: "Location",
              value: location,
            },
          ]}
        />

        {/* About organisation */}
        <div className="rounded-[12px] border border-[#a9aaa4] bg-white p-5">
          <h3 className="mb-3 text-base font-bold text-[#1f1f1f]">
            About Organisation
          </h3>

          <p className="text-sm leading-6 text-[#70696b]">
            {description ||
              "No organisation description provided."}
          </p>
        </div>
      </div>

      <ProfileEditModal
        open={editOpen}
        role="recruiter"
        recruiterProfile={recruiterQuery.data}
        onClose={() => setEditOpen(false)}
      />
    </>
  );
}