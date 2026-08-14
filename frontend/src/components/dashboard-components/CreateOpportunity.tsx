"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import StatusModal from "@/components/StatusModal";

import {
  useCreateOpportunity,
  useMyOpportunity,
  useOpportunityFields,
  useUpdateOpportunity,
} from "@/hooks/useOpportunity";

type Tab = "basic" | "requirements" | "additional";

interface FormValues {
  title: string;
  opportunity_type: string;
  field: string;
  organisation: string;
  location: string;
  description: string;
  requirements: string;
  skills: string;
  benefits: string;
  responsibilities: string;
  application_url: string;
  application_date: string;
  is_remote: boolean;
}

const initialValues: FormValues = {
  title: "",
  opportunity_type: "",
  field: "",
  organisation: "",
  location: "",
  description: "",
  requirements: "",
  skills: "",
  benefits: "",
  responsibilities: "",
  application_url: "",
  application_date: "",
  is_remote: false,
};

const tabs = [
  {
    id: "basic" as const,
    label: "Basic Information",
  },
  {
    id: "requirements" as const,
    label: "Requirements",
  },
  {
    id: "additional" as const,
    label: "Additional Details",
  },
];

const toArray = (value: string) => {
  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
};

const arrayToText = (
  value?: string[] | string
) => {
  if (Array.isArray(value)) {
    return value.join("\n");
  }

  return value || "";
};

export default function CreateOpportunity() {
  const router = useRouter();

  const [activeTab, setActiveTab] =
    useState<Tab>("basic");

  const [form, setForm] =
    useState<FormValues>(initialValues);

  const [editId, setEditId] = useState<
    string | undefined
  >(undefined);

  const [success, setSuccess] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [error, setError] = useState("");

  /*
   * =========================
   * GET EDIT ID
   * =========================
   */

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    setEditId(
      params.get("edit") || undefined
    );
  }, []);

  /*
   * =========================
   * QUERIES / MUTATIONS
   * =========================
   */

  const {
    data: existingOpportunity,
    isLoading: isLoadingOpportunity,
  } = useMyOpportunity(editId);

  const {
    data: fields = [],
    isLoading: isLoadingFields,
  } = useOpportunityFields();

  const createMutation =
    useCreateOpportunity();

  const updateMutation =
    useUpdateOpportunity();

  /*
   * =========================
   * POPULATE EDIT FORM
   * =========================
   */

  useEffect(() => {
    if (!existingOpportunity) return;

    const deadline =
      existingOpportunity.deadline
        ? new Date(
            existingOpportunity.deadline
          )
        : null;

    setForm({
      title:
        existingOpportunity.title || "",

      opportunity_type:
        existingOpportunity.opportunity_type || "",

      field:
        existingOpportunity.field || "",

      organisation:
        existingOpportunity.organisation || "",

      location:
        existingOpportunity.location || "",

      description:
        existingOpportunity.description || "",

      requirements: arrayToText(
        existingOpportunity.requirements
      ),

      skills: arrayToText(
        existingOpportunity.skills_required
      ),

      benefits: arrayToText(
        existingOpportunity.benefits
      ),

      responsibilities: arrayToText(
        existingOpportunity.responsibilities
      ),

      application_url:
        existingOpportunity.application_url || "",

      application_date: deadline
        ? `${deadline.getFullYear()}-${String(
            deadline.getMonth() + 1
          ).padStart(2, "0")}-${String(
            deadline.getDate()
          ).padStart(2, "0")}`
        : "",

      is_remote:
        existingOpportunity.is_remote || false,
    });
  }, [existingOpportunity]);

  /*
   * =========================
   * HELPERS
   * =========================
   */

  const updateField = (
    field: keyof FormValues,
    value: string | boolean
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const getNextTab = () => {
    if (activeTab === "basic") {
      setActiveTab("requirements");
      return;
    }

    if (activeTab === "requirements") {
      setActiveTab("additional");
    }
  };

  const getPreviousTab = () => {
    if (activeTab === "additional") {
      setActiveTab("requirements");
      return;
    }

    if (activeTab === "requirements") {
      setActiveTab("basic");
    }
  };

  const validateBasic = () => {
    if (!form.title.trim()) {
      setError(
        "Opportunity title is required."
      );
      return false;
    }

    if (!form.opportunity_type) {
      setError(
        "Please select an opportunity type."
      );
      return false;
    }

    if (!form.field) {
      setError("Please select a field.");
      return false;
    }

    if (!form.organisation.trim()) {
      setError(
        "Organisation is required."
      );
      return false;
    }

    if (!form.location.trim()) {
      setError("Location is required.");
      return false;
    }

    if (!form.description.trim()) {
      setError(
        "Short description is required."
      );
      return false;
    }

    return true;
  };

  const validateAdditional = () => {
    if (!form.application_date) {
      setError(
        "Application date is required."
      );
      return false;
    }

    return true;
  };

  /*
   * =========================
   * SUBMIT
   * =========================
   */

  const handleSubmit = () => {
    if (!validateBasic()) {
      setActiveTab("basic");
      return;
    }

    if (!validateAdditional()) {
      setActiveTab("additional");
      return;
    }

    const payload = {
      title: form.title.trim(),

      description:
        form.description.trim(),

      responsibilities:
        form.responsibilities.trim(),

      requirements: toArray(
        form.requirements
      ),

      skills_required: toArray(
        form.skills
      ),

      benefits: toArray(
        form.benefits
      ),

      opportunity_type:
        form.opportunity_type,

      organisation:
        form.organisation.trim(),

      application_url:
        form.application_url.trim(),

      location:
        form.location.trim(),

      /*
       * IMPORTANT:
       * This is now the UUID selected
       * from /opportunities/fields/
       */
      field: form.field,

      deadline: new Date(
        `${form.application_date}T23:59:59`
      ).toISOString(),

      is_remote:
        form.is_remote,
    };

    if (editId) {
      updateMutation.mutate(
        {
          opportunityId: editId,
          data: payload,
        },
        {
          onSuccess: () => {
            setSuccessMessage(
              "Opportunity updated successfully."
            );

            setSuccess(true);
          },

          onError: (err: any) => {
            setError(
              err?.message ||
                "Unable to update opportunity."
            );
          },
        }
      );

      return;
    }

    createMutation.mutate(payload, {
      onSuccess: () => {
        setSuccessMessage(
          "Opportunity created successfully and sent for review."
        );

        setSuccess(true);
      },

      onError: (err: any) => {
        setError(
          err?.message ||
            "Unable to create opportunity."
        );
      },
    });
  };

  const isSaving =
    createMutation.isPending ||
    updateMutation.isPending;

  /*
   * =========================
   * LOADING EDIT
   * =========================
   */

  if (
    editId &&
    isLoadingOpportunity
  ) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <p className="text-sm text-[#70696b]">
          Loading opportunity...
        </p>
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
        className="mx-auto w-full max-w-[1100px]"
      >
        {/* Header */}

        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-lg font-bold text-[#1f1f1f]">
              {editId
                ? "Edit Opportunity"
                : "Create Opportunity"}
            </h1>

            <p className="mt-1 text-xs text-[#70696b]">
              Fill in the details of the
              opportunity you want to post.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="rounded-[6px] bg-[#356c45] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2c5b3a] disabled:opacity-50"
          >
            {isSaving
              ? "Saving..."
              : "Save"}
          </button>
        </div>

        {/* Tabs */}

        <div className="mb-0 flex border-b border-[#a9aaa4]">
          {tabs.map((tab) => {
            const active =
              activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() =>
                  setActiveTab(tab.id)
                }
                className={`relative px-5 pb-3 text-sm font-medium ${
                  active
                    ? "text-primary"
                    : "text-[#70696b]"
                }`}
              >
                {tab.label}

                {active && (
                  <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary" />
                )}
              </button>
            );
          })}
        </div>

        {/* Form Card */}

        <div className="rounded-b-[6px] border-x border-b border-[#a9aaa4] bg-white p-6">

          {/* BASIC */}

          {activeTab === "basic" && (
            <div className="min-h-[470px]">
              <div className="mb-6">
                <h2 className="text-base font-bold text-[#1f1f1f]">
                  Basic Information
                </h2>

                <p className="mt-1 text-xs text-[#70696b]">
                  Provide the basic details
                  about the opportunity.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">

                {/* Title */}

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#1f1f1f]">
                    Opportunity Title
                  </label>

                  <input
                    value={form.title}
                    onChange={(event) =>
                      updateField(
                        "title",
                        event.target.value
                      )
                    }
                    placeholder="Frontend Development Intern"
                    className="h-10 w-full rounded-[5px] border border-[#b7b7b7] bg-white px-3 text-sm outline-none focus:border-primary"
                  />
                </div>

                {/* Type */}

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#1f1f1f]">
                    Opportunity Type
                  </label>

                  <select
                    value={
                      form.opportunity_type
                    }
                    onChange={(event) =>
                      updateField(
                        "opportunity_type",
                        event.target.value
                      )
                    }
                    className="h-10 w-full rounded-[5px] border border-[#b7b7b7] bg-white px-3 text-sm outline-none focus:border-primary"
                  >
                    <option value="">
                      Select Type
                    </option>

                    <option value="internship">
                      Internship
                    </option>

                    <option value="job">
                      Job
                    </option>

                    <option value="scholarship">
                      Scholarship
                    </option>

                    <option value="fellowship">
                      Fellowship
                    </option>

                    <option value="volunteer">
                      Volunteer
                    </option>
                  </select>
                </div>

                {/* Field */}

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#1f1f1f]">
                    Field
                  </label>

                  <select
                    value={form.field}
                    onChange={(event) =>
                      updateField(
                        "field",
                        event.target.value
                      )
                    }
                    disabled={isLoadingFields}
                    className="h-10 w-full rounded-[5px] border border-[#b7b7b7] bg-white px-3 text-sm outline-none focus:border-primary disabled:bg-gray-50"
                  >
                    <option value="">
                      {isLoadingFields
                        ? "Loading fields..."
                        : "Select Field"}
                    </option>

                    {fields.map((field) => (
                      <option
                        key={field.id}
                        value={field.id}
                      >
                        {field.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Organisation */}

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#1f1f1f]">
                    Organisation
                  </label>

                  <input
                    value={
                      form.organisation
                    }
                    onChange={(event) =>
                      updateField(
                        "organisation",
                        event.target.value
                      )
                    }
                    placeholder="Organisation name"
                    className="h-10 w-full rounded-[5px] border border-[#b7b7b7] bg-white px-3 text-sm outline-none focus:border-primary"
                  />
                </div>

                {/* Location */}

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#1f1f1f]">
                    Location
                  </label>

                  <input
                    value={form.location}
                    onChange={(event) =>
                      updateField(
                        "location",
                        event.target.value
                      )
                    }
                    placeholder="e.g. Lagos, Nigeria"
                    className="h-10 w-full rounded-[5px] border border-[#b7b7b7] bg-white px-3 text-sm outline-none focus:border-primary"
                  />
                </div>

                {/* Remote */}

                <div className="flex items-center pt-5">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-[#1f1f1f]">
                    <input
                      type="checkbox"
                      checked={
                        form.is_remote
                      }
                      onChange={(event) =>
                        updateField(
                          "is_remote",
                          event.target.checked
                        )
                      }
                      className="h-4 w-4 accent-primary"
                    />

                    This opportunity is remote
                  </label>
                </div>

                {/* Description */}

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold text-[#1f1f1f]">
                    Short Description
                  </label>

                  <textarea
                    value={
                      form.description
                    }
                    onChange={(event) =>
                      updateField(
                        "description",
                        event.target.value
                      )
                    }
                    placeholder="Add a short description of the opportunity"
                    className="h-[120px] w-full resize-none rounded-[5px] border border-[#b7b7b7] p-3 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* REQUIREMENTS */}

          {activeTab ===
            "requirements" && (
            <div className="min-h-[470px]">
              <div className="mb-6">
                <h2 className="text-base font-bold text-[#1f1f1f]">
                  Requirements
                </h2>

                <p className="mt-1 text-xs text-[#70696b]">
                  Add the requirements and
                  skills for this opportunity.
                </p>
              </div>

              <div className="flex flex-col gap-5">

                {/* Requirements */}

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#1f1f1f]">
                    Required Qualifications
                  </label>

                  <textarea
                    value={
                      form.requirements
                    }
                    onChange={(event) =>
                      updateField(
                        "requirements",
                        event.target.value
                      )
                    }
                    placeholder={
                      "Add each requirement on a new line.\n\nExample:\nBachelor's degree in Computer Science\nExperience with React"
                    }
                    className="h-[140px] w-full resize-none rounded-[5px] border border-[#b7b7b7] p-3 text-sm outline-none focus:border-primary"
                  />

                  <p className="mt-1.5 text-xs text-[#9a9a9a]">
                    Each line will be submitted
                    as a separate requirement.
                  </p>
                </div>

                {/* Skills */}

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#1f1f1f]">
                    Skills Required
                  </label>

                  <input
                    value={form.skills}
                    onChange={(event) =>
                      updateField(
                        "skills",
                        event.target.value
                      )
                    }
                    placeholder="React, Figma, UI/UX, Research"
                    className="h-10 w-full rounded-[5px] border border-[#b7b7b7] px-3 text-sm outline-none focus:border-primary"
                  />

                  <p className="mt-1.5 text-xs text-[#9a9a9a]">
                    Separate skills with
                    commas.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ADDITIONAL */}

          {activeTab ===
            "additional" && (
            <div className="min-h-[470px]">
              <div className="mb-6">
                <h2 className="text-base font-bold text-[#1f1f1f]">
                  Additional Details
                </h2>

                <p className="mt-1 text-xs text-[#70696b]">
                  Provide more information
                  to help applicants
                  understand the opportunity.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Benefits */}

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold text-[#1f1f1f]">
                    Benefits
                  </label>

                  <textarea
                    value={form.benefits}
                    onChange={(event) =>
                      updateField(
                        "benefits",
                        event.target.value
                      )
                    }
                    placeholder={
                      "Add benefits on separate lines.\nExample:\nCertificate\nMentorship\nFlexible working hours"
                    }
                    className="h-[110px] w-full resize-none rounded-[5px] border border-[#b7b7b7] p-3 text-sm outline-none focus:border-primary"
                  />

                  <p className="mt-1.5 text-xs text-[#9a9a9a]">
                    Each line will be submitted
                    as a separate benefit.
                  </p>
                </div>

                {/* Responsibilities */}

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold text-[#1f1f1f]">
                    Responsibilities
                  </label>

                  <textarea
                    value={
                      form.responsibilities
                    }
                    onChange={(event) =>
                      updateField(
                        "responsibilities",
                        event.target.value
                      )
                    }
                    placeholder={
                      "Describe the responsibilities of the role."
                    }
                    className="h-[110px] w-full resize-none rounded-[5px] border border-[#b7b7b7] p-3 text-sm outline-none focus:border-primary"
                  />
                </div>

                {/* Application URL */}

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#1f1f1f]">
                    Application URL
                  </label>

                  <input
                    value={
                      form.application_url
                    }
                    onChange={(event) =>
                      updateField(
                        "application_url",
                        event.target.value
                      )
                    }
                    placeholder="https://example.com/apply"
                    className="h-10 w-full rounded-[5px] border border-[#b7b7b7] px-3 text-sm outline-none focus:border-primary"
                  />
                </div>

                {/* Application Date */}

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#1f1f1f]">
                    Application Date
                  </label>

                  <input
                    type="date"
                    value={
                      form.application_date
                    }
                    onChange={(event) =>
                      updateField(
                        "application_date",
                        event.target.value
                      )
                    }
                    className="h-10 w-full rounded-[5px] border border-[#b7b7b7] bg-white px-3 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Bottom buttons */}

          <div className="mt-4 flex justify-end gap-3 border-t border-[#eeeeee] pt-4">
            <button
              type="button"
              onClick={() => {
                if (
                  activeTab === "basic"
                ) {
                  router.push(
                    "/recruiter-dashboard"
                  );
                  return;
                }

                getPreviousTab();
              }}
              className="rounded-[5px] border border-[#b7b7b7] bg-white px-4 py-2 text-sm text-[#1f1f1f] hover:bg-gray-50"
            >
              {activeTab === "basic"
                ? "Cancel"
                : "Back"}
            </button>

            {activeTab !==
            "additional" ? (
              <button
                type="button"
                onClick={() => {
                  if (
                    activeTab === "basic" &&
                    !validateBasic()
                  ) {
                    return;
                  }

                  getNextTab();
                }}
                className="rounded-[5px] border border-[#b7b7b7] bg-white px-4 py-2 text-sm text-[#1f1f1f] hover:bg-gray-50"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-[5px] bg-primary px-5 py-2 text-sm text-white disabled:opacity-50"
              >
                {isSaving
                  ? "Saving..."
                  : editId
                    ? "Update"
                    : "Create"}
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Success */}

      <StatusModal
        open={success}
        type="success"
        message={successMessage}
        buttonText="Okay"
        onButtonClick={() => {
          setSuccess(false);

          router.push(
            "/recruiter-dashboard"
          );
        }}
        onClose={() =>
          setSuccess(false)
        }
      />

      {/* Error */}

      <StatusModal
        open={!!error}
        type="error"
        message={error}
        buttonText="Okay"
        onButtonClick={() =>
          setError("")
        }
        onClose={() =>
          setError("")
        }
      />
    </>
  );
}