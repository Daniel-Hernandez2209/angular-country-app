import {
  Component,
  effect,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  placeholder = input('Buscar');
  inicialValue = input<string>('');
  debunceTime = input(1000);
  value = output<string>();

  inputValue = linkedSignal<string>(() => this.inicialValue() ?? '');

  debunceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, this.debunceTime());

    onCleanup(() => clearTimeout(timeout));
  });
}
