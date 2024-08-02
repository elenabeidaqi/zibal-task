import moment from "jalali-moment";
export function ConvertToEnglishNumber(persianNumber: string) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return persianNumber
    .split("")
    .map((char) => {
      const index = persianDigits.indexOf(char);
      return index !== -1 ? index.toString() : char;
    })
    .join("");
}

export function ConvertToPersianDate(time: string): string {
    const parsedGregorian = moment(time, 'jYYYY/jMM/jDD-HH:mm:ss');
    const persianMonth = parsedGregorian.locale('fa').format('jMMMM');
    const dayNumber = parsedGregorian.locale('fa').format('jDD');
    const jalaliDate = parsedGregorian.locale('fa').format('jYYYY HH:mm');
  return `${dayNumber} ${persianMonth}  ${jalaliDate}`
}
