export const product = {
  name: "Relaxa Heated Back & Neck Massager",
  shortName: "Relaxa Massager",
  regularPrice: 2999,
  price: 1999,
  currency: "Rs.",
  phone: "9768557688",
  benefits: [
    ["🔥", "Soothing heat", "Gentle warmth helps relax tired, tense muscles."],
    ["💆", "Deep kneading", "A soothing kneading massage around your neck and back."],
    ["🙌", "Hands-free comfort", "Enjoy your massage without needing someone else."],
    ["🏠", "Relax anywhere", "Ideal after work, study, driving, or long sitting."],
  ],
  images: ["/images/hero.png", "/images/heat.png", "/images/controls.png", "/images/uses.png", "/images/design.png"],
};
export const money = (amount: number) => `Rs. ${new Intl.NumberFormat("en-US").format(amount)}`;
