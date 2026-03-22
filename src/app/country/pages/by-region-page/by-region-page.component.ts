import { Component, inject, linkedSignal, signal } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  ActivatedRoute,
  Router,
} from '@angular/router';
import { Region } from '../../interfaces/region.interface';
import { CountryService } from '../../services/country.service';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

function getParams(queryParams: string) {
  queryParams = queryParams.toLowerCase();
  const validRegion: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  };

  return validRegion[queryParams] ?? 'Africa';
}
@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  countryService = inject(CountryService);
  router = inject(Router);
  activedRoute = inject(ActivatedRoute);

  // Lee el query param de la URL al entrar
  queryParam = (this.activedRoute.snapshot.queryParamMap.get('region') ??
    '') as Region;
  selectedRegion = linkedSignal<Region>(() => getParams(this.queryParam));

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  regionResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {
      if (!request.region) return of([]);

      // Guarda la región en la URL
      this.router.navigate(['/country/by-region'], {
        queryParams: { region: request.region },
      });

      return this.countryService.searchByRegion(request.region);
    },
  });
}
