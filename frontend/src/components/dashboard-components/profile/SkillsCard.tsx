interface SkillsCardProps {
  skills: string[];
}

export default function SkillsCard({
  skills,
}: SkillsCardProps) {
  return (
    <div className="rounded-[12px] border border-[#a9aaa4] bg-white p-5">
      <h3 className="mb-4 text-base font-bold text-[#1f1f1f]">
        Skills
      </h3>

      {skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="rounded-md bg-[#d5f4cf] px-3 py-1.5 text-sm text-[#2b6b41]"
            >
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[#70696b]">
          No skills added yet.
        </p>
      )}
    </div>
  );
}