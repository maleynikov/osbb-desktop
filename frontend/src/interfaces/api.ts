export interface Response {
  data: Array<any>;
  status: "OK" | "FAIL";
  error: string;
}
