interface NotificationPreferencesProps {
  emailNotifications?: boolean;
  applicationReminders?: boolean;
}

export default function NotificationPreferences({
  emailNotifications = true,
  applicationReminders = true,
}: NotificationPreferencesProps) {
  const items = [
    {
      label: "Email Notifications",
      description: "Receive updates via email",
      enabled: emailNotifications,
    },
    {
      label: "Application Reminders",
      description: "Get reminded about deadlines",
      enabled: applicationReminders,
    },
  ];

  return (
    <div className="rounded-[12px] border border-[#a9aaa4] bg-white p-4">
      <h3 className="mb-3 text-xs font-bold text-[#1f1f1f]">
        Notification Preferences
      </h3>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between"
          >
            <div>
              <p className="text-[11px] font-medium text-[#363132]">
                {item.label}
              </p>

              <p className="text-[9px] text-[#999294]">
                {item.description}
              </p>
            </div>

            <div
              className={`relative h-[14px] w-[25px] rounded-full ${
                item.enabled
                  ? "bg-[#2b6b41]"
                  : "bg-[#c8bec1]"
              }`}
            >
              <span
                className={`absolute top-[2px] h-[10px] w-[10px] rounded-full bg-white ${
                  item.enabled
                    ? "right-[2px]"
                    : "left-[2px]"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}