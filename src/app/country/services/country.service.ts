import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Country } from '../interfaces/country.interface';
import { map, Observable, catchError, throwError, of, tap, delay } from 'rxjs';
import { CountryMapper } from '../mapper/country.mapper';
import { ResCountry } from '../interfaces/rest-country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private httpCliente = inject(HttpClient);
  private queryCacheCapital: Map<string, Country[]> = new Map();
  private queryCacheCountry: Map<string, Country[]> = new Map();
  private queryCacheRegion: Map<string, Country[]> = new Map();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }
    return this.httpCliente
      .get<ResCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map(CountryMapper.mapRestCountryArrayToCountryarray),
        tap((countries) => this.queryCacheCapital.set(query, countries)),
        catchError((err) => {
          console.log(err, 'Error en la consulta');

          return throwError(() => new Error('Error en la consulta'));
        }),
      );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }
    return this.httpCliente.get<ResCountry[]>(`${API_URL}/name/${query}`).pipe(
      map(CountryMapper.mapRestCountryArrayToCountryarray),
      tap((countries) => this.queryCacheCountry.set(query, countries)),
      delay(2000),
      catchError((err) => {
        console.log(err, 'Error en la consulta');

        return throwError(() => new Error('Error en la consulta'));
      }),
    );
  }
  searchCountryByCode(code: string): Observable<Country | null> {
    return this.httpCliente.get<ResCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryarray(resp)),
      map((countries) => countries.at(0) ?? null),
      catchError((err) => {
        console.log(err, 'Error en la consulta');

        return throwError(
          () =>
            new Error(
              `No se pudo encontrar el país con los datos proporcioandos: ${code}`,
            ),
        );
      }),
    );
  }

  searchByRegion(region: string): Observable<Country[]> {
    region = region.toLowerCase();
    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }
    console.log({ region }, 'Region en el servicio');
    return this.httpCliente
      .get<ResCountry[]>(`${API_URL}/region/${region}`)
      .pipe(
        map(CountryMapper.mapRestCountryArrayToCountryarray),
        tap((regiones) => this.queryCacheRegion.set(region, regiones)),
        catchError((err) => {
          console.log(err, 'Error en la consulta region');

          return of([]);
        }),
      );
  }
}
