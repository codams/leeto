import type { beneficiary } from "../components/GiftCard";

export const listBeneficiaries = (
  beneficiaries: beneficiary[]
): string | string[] => {
  /**
   * Handle the display of the names and the ", " and " et "
   * to separate list elements in written french
   * TODO Handle capitalization if user is not first
   */
  if (beneficiaries.length === 1 && beneficiaries[0].type === "user")
    return "Vous-même";
  if (beneficiaries.length === 1 && beneficiaries[0].type !== "user")
    return beneficiaries[0].firstName;
  return beneficiaries.map((beneficiary, index) => {
    let eachBenef = "";
    if (beneficiary.type === "user") {
      if (index === beneficiaries.length - 2) {
        eachBenef += "Vous-même et ";
      } else {
        eachBenef += "Vous-même, ";
      }
    }
    if (index < beneficiaries.length - 1 && beneficiary.type !== "user") {
      if (index === beneficiaries.length - 2)
        eachBenef += beneficiary.firstName + " et ";
      else eachBenef += beneficiary.firstName + ", ";
    } else if (beneficiary.type !== "user") eachBenef += beneficiary.firstName;
    return eachBenef;
  });
};
