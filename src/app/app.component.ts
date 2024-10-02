import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  combineLatest,
  debounceTime,
  filter,
  forkJoin,
  map,
  Observable,
  Subject,
  Subscription,
  switchMap,
} from "rxjs";
import { MockDataService } from "./mock-data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  searchTermByCharacters = new Subject<string>();
  charactersResults$!: Observable<any>;
  planetAndCharactersResults$!: Observable<any>;
  isLoading: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.initLoadingState();
    this.initCharacterEvents();
  }

  changeCharactersInput(element: any): void {
    // 1.1. Add functionality to changeCharactersInput method. Changes searchTermByCharacters Subject value on input change.
    const inputValue: string = element.target.value;
    this.searchTermByCharacters.next(inputValue);
  }

  initCharacterEvents(): void {
    // 1.2. Add API call on each user input. Use mockDataService.getCharacters - to make get request.
    // 2. Since we don't want to spam our service add filter by input value and do not call API until a user enters at least 3 chars.
    // 3. Add debounce to prevent API calls until user stop typing.

    this.charactersResults$ = this.searchTermByCharacters.pipe(
      debounceTime(300),
      filter((searchTerm: string) => searchTerm.length >= 3),

      switchMap((searchTerm: string) => {
        return this.mockDataService.getCharacters(searchTerm).pipe(
          map((results) => {
            return results;
          })
        );
      })
    );
  }

  loadCharactersAndPlanet(): void {
    // 4. On clicking the button 'Load Characters And Planets', it is necessary to process two requests and combine the results of both requests into one result array. As a result, a list with the names of the characters and the names of the planets is displayed on the screen.
    // Your code should looks like this: this.planetAndCharactersResults$ = /* Your code */

    this.planetAndCharactersResults$ = forkJoin({
      planets: this.mockDataService.getPlanets(),
      characters: this.mockDataService.getCharacters(),
    }).pipe(
      map(({ characters, planets }) => {
        return [
          ...characters.map((character: { name: string }) => ({
            name: character.name,
          })),
          ...planets.map((planet: { name: string }) => ({ name: planet.name })),
        ];
      })
    );
  }

  initLoadingState(): void {
    /* 5.1. Let's add loader logic to our page. For each request, we have an observable that contains the state of the request. When we send a request the value is true, when the request is completed, the value becomes false. You can get value data with mockDataService.getCharactersLoader() and mockDataService.getPlanetLoader().
    - Combine the value of each of the streams.
    - Subscribe to changes
    - Check the received value using the areAllValuesTrue function and pass them to the isLoading variable. */
    const characterLoader = this.mockDataService.getCharactersLoader();
    const planetLoader = this.mockDataService.getPlanetLoader();

    const loaders = combineLatest([characterLoader, planetLoader]).pipe(
      map(([charactersLoading, planetsLoading]) => {
        return this.areAllValuesTrue([charactersLoading, planetsLoading]);
      })
    );

    const loadingSubscription = loaders.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });

    this.subscriptions.push(loadingSubscription);
  }

  ngOnDestroy(): void {
    // 5.2 Unsubscribe from all subscriptions
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  areAllValuesTrue(elements: boolean[]): boolean {
    return elements.every((el) => el);
  }
}
