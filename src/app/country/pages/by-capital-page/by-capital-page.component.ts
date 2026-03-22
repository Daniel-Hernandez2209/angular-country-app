import { Component, inject, linkedSignal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);
  activedRoute = inject(ActivatedRoute);
  route = inject(Router);

  queryParam = this.activedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal(() => this.queryParam);

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
      this.route.navigate(['/country/by-capital'], {
        queryParams: { query: request.query },
      });
      return this.countryService.searchByCapital(request.query);
    },
  });

  // isLoding = signal(false);
  // isError = signal<string | null>(null);
  // countrys = signal<Country[]>([]);

  // onSearch(query: string) {
  //   if (this.isLoding()) return;
  //   this.isLoding.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByContry(query).subscribe({
  //     next: (countries) => {
  //       this.countrys.set(countries);
  //       this.isLoding.set(false);
  //     },
  //     error: (err) => {
  //       this.isError.set(err);
  //       this.countrys.set([]);
  //       this.isLoding.set(false);
  //     },
  //   });
  // }
}
