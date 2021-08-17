import { checkUrl } from "../client/js/checkURL";

 
describe("Testing the checkUrl", () => {
      
    test("testing url check", () => {
           expect(checkUrl( 'http://www.google.com')).toBeTruthy();
           expect(checkUrl( 'www.google.com')).toBeFalsy();
})});