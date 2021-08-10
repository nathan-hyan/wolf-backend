import { Rating } from "@interfaces/product";

export const updateRating = (rating: Rating, newRating: number) => {
  switch (newRating) {
    case 1:
      ++rating.oneStar;
      ++rating.usersRating;
      break;

    case 2:
      ++rating.twoStar;
      ++rating.usersRating;
      break;

    case 3:
      ++rating.threeStar;
      ++rating.usersRating;
      break;

    case 4:
      ++rating.fourStar;
      ++rating.usersRating;
      break;

    case 5:
      ++rating.fiveStar;
      ++rating.usersRating;
      break;

    default:
      throw new Error("Invalid value");
  }
  const allStars =
    rating.oneStar +
    rating.twoStar * 2 +
    rating.threeStar * 3 +
    rating.fourStar * 4 +
    rating.fiveStar * 5;
  const newTotalRating = allStars / rating.usersRating;

  return { ...rating, total: newTotalRating };
};
