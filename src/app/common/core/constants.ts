export class Constants {
  public static Instance = new Constants();

  public siteTitle = 'Warriors of Orlandia';

  public cache = {
    useCache: true,
    defaultExpires: 86400, // 24 hours
    oneWeekExpires: 86400 * 7,
  };

  public http = {
    baseUrl: 'https://api.warriorsoforlandia.com/api/',
    staticsBaseUrl: 'http://statics.warriorsoforlandia.com/',
    cards: {
      search: 'cards/search',
      get: 'cards/{id}',
      types: 'cards/types',
      sets: 'cards/sets',
      image: 'warriors/cards/{{setYear}}/{{type}}/{{name}}.png',
      thumbnail: 'warriors/cards/{{setYear}}/{{type}}/{{name}}-thumb.png',
    }
  };
}