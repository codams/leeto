import { expect, test } from "vitest";
import { listBeneficiaries } from "./listBeneficiaries";
import type { beneficiary } from "../components/GiftCard";

const beneficiaries2: beneficiary[] = [
  {
    id: 1,
    type: "user",
    firstName: "Geralt",
    consumption: {
      allowedAmount: 60,
      consumedAmount: 35,
    },
  },
  {
    id: 2,
    type: "companion",
    firstName: "Yennefer",
    consumption: {
      allowedAmount: 60,
      consumedAmount: 0,
    },
  },
];

const beneficiaries3: beneficiary[] = [
  {
    id: 1,
    type: "user",
    firstName: "Geralt",
    consumption: {
      allowedAmount: 50,
      consumedAmount: 30,
    },
  },
  {
    id: 2,
    type: "companion",
    firstName: "Yennefer",
    consumption: {
      allowedAmount: 25,
      consumedAmount: 25,
    },
  },
  {
    id: 3,
    type: "child",
    firstName: "Cirilla",
    consumption: {
      allowedAmount: 25,
      consumedAmount: 25,
    },
  },
];

const beneficiaries1: beneficiary[] = [
  {
    id: 1,
    type: "user",
    firstName: "Geralt",
    consumption: {
      allowedAmount: 60,
      consumedAmount: 35,
    },
  },
];

const beneficiaries4: beneficiary[] = [
  {
    id: 1,
    type: "child",
    firstName: "Geralt",
    consumption: {
      allowedAmount: 60,
      consumedAmount: 35,
    },
  },
];

test("With one", () => {
  expect(listBeneficiaries(beneficiaries1)).toStrictEqual("Vous-même");
});

test("With two", () => {
  expect(listBeneficiaries(beneficiaries2)).toStrictEqual([
    "Vous-même et ",
    "Yennefer",
  ]);
});

test("With three", () => {
  expect(listBeneficiaries(beneficiaries3)).toStrictEqual([
    "Vous-même, ",
    "Yennefer et ",
    "Cirilla",
  ]);
});

test("With 1 child", () => {
  expect(listBeneficiaries(beneficiaries4)).toStrictEqual("Geralt");
});
