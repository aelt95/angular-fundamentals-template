import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "duration",
})
export class DurationPipe implements PipeTransform {
  transform(duration: number): string {
    if (!duration) {
      return "00:00 hours";
    }
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const hourLabel = hours === 1 ? "hour" : "hours";

    return `${formattedHours}:${formattedMinutes} ${hourLabel}`;
  }
}
