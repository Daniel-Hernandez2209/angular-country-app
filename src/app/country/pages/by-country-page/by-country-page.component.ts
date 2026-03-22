import { Component, inject, linkedSignal, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);
  route = inject(Router);
  activedRoute = inject(ActivatedRoute);

  queryparam = this.activedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal(() => this.queryparam);

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
      this.route.navigate(['/country/by-country'], {
        queryParams: { query: request.query },
      });

      return this.countryService.searchByCountry(request.query);
    },
  });
}
