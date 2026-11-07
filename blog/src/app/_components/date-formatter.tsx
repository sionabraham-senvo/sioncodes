type Props = {
  dateString: string;
};

// A fixed time zone keeps the rendered date the same whether the site is built locally or in CI.
const formatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Berlin",
});

export default function DateFormatter({ dateString }: Props) {
  return <time dateTime={dateString}>{formatter.format(new Date(dateString))}</time>;
}
