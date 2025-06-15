import { Student } from "./StudentInfo";
import { STUDENT_DATA_STORAGE_KEY } from "../../../constants";
import { localStorageService } from "../../../localStroageService/localStroageService";

export function sendEmail(emailAddress: string, content: string): boolean {
  console.log(`Sending email to ${emailAddress} with content: ${content}`);
  return true;
}