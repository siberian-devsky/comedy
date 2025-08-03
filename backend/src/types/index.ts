export type ComicQueryResponse = {
	status: number
	data: object
	message: string
}

export type PersonDetail = {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string;
  firstName: string
  gender: number;
  homepage: string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  lastName: string
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
};
