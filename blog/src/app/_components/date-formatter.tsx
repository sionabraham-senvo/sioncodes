import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
  includeTimezone?: boolean;
};

export default function DateFormatter({ dateString, includeTimezone = false }: Props) {
  const date = parseISO(dateString);

  if (includeTimezone) {
    // Get timezone offset (e.g., +0100)
    const offset = format(date, "xxx");

    // ISO format with UTC and offset
    return (
      <time dateTime={dateString}>
        {format(date, "yyyy-MM-dd 'at' HH:mm")} UTC{offset}
      </time>
    );
  }

  // Standard ISO format without timezone
  return (
    <time dateTime={dateString}>
      {format(date, "yyyy-MM-dd")}
    </time>
  );
}