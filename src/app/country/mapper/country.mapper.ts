import { Country } from '../interfaces/country.interface';
import { ResCountry } from '../interfaces/rest-country.interface';

export class CountryMapper {
  static MapRestContryToContry(resContry: ResCountry): Country {
    return {
      capital: resContry.capital?.join(', ') ?? 'No capital',
      name: resContry.translations?.['spa']?.common ?? resContry.name.common,
      population: resContry.population,
      flag: resContry.flags.png,
      flagSvg: resContry.flags.svg,
      cca2: resContry.cca2,
      region: resContry.region,
      subregion: resContry.subregion!,
    };
  }
  static mapRestCountryArrayToCountryarray(
    resCountries: ResCountry[],
  ): Country[] {
    return resCountries.map(CountryMapper.MapRestContryToContry);
  }
}
