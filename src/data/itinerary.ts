import { nanoid } from '@reduxjs/toolkit';
import type { Itinerary } from '../components/itinerary/types/types';

export const DUMMY_ITINERARIES: Itinerary[] = [
  {
    id: 'itinerary-1',
    creatorId: 'user-1',
    routes: [
      {
        id: nanoid(),
        name: 'Day 1',
        routeNodes: [
          {
            placeId: 'ChIJ89lf6hE92jERQXt7c5QOFnY',
            name: 'Tampines Mall',
            address: '4 Tampines Central 5, Singapore 529510',
            coord: {
              latitude: 1.352451,
              longitude: 103.9446732,
            },
          },
          {
            placeId: 'ChIJT80kwuYW2jERhogn4ZW0fG4',
            name: 'AMK Hub',
            address: '53 Ang Mo Kio Ave 3, Singapore 569933',
            coord: {
              latitude: 1.3690023,
              longitude: 103.8481594,
            },
          },
          {
            placeId: 'ChIJTzCCaz0Z2jERx_S17pyhem8',
            name: 'MBS Casino',
            address: '10 Bayfront Ave, Singapore 018956',
            coord: {
              latitude: 1.2835922,
              longitude: 103.859611,
            },
          },
        ],
        isRouted: true,
        encodedPolyline:
          'ovaGkuiyRxAaAx@}@PA@TFp@Fp@RdCTlCh@dGl@pGZnCTxAj@xC|@xDbB|GpAlF\\bBJdABz@CpBUvDGbAItB?lBD`AZvCJx@`BrM`AtHfAlId@`EBx@ArBUlEEbBDtAvAtSVtC^rDfDpZv@dLb@|FHnDXdEz@bIh@fE\\|Cp@~Hr@zG`AfKR~CDr@d@tDf@tE`@jD^bBn@`BjDbGtDhGvEnI`BzCpB`DbA`Ct@jBl@nCPdAzCfQhAnC|CtEjGbG|FjHxIvK|G`H|TzRhQ`NNJhAXpCZRAnIaCd@SzCmAnDsB\\MdCe@f@Ab@Fz@VbJhEhOdFv@Pz@JvJx@bAJfA`@pJfF~QvJp@^ZVr@v@R^Nt@TnEALQ?IbN_@nAwCtCoOdIaCvBwBtDeAhBeFjJuEzHaHpGaBrAe@lAPxEE`[SvAsArJmEbHyDdG[rCKhNG`Bc@tCqBdFKEkAzC{@zB[rAkBbTy@pIQfAYfAM^e@bASXo@z@wBfCgCrCsAdAWLwDpBcCrAsClAiAp@o@d@uArA}PfSwF|GSVq@fAqA|AuC|CyC`DaDxDwEpFwCnD[d@_@x@g@nAQp@In@QbBQzDa@zHKxAUzB]~CM|BAh@I`CShFIdAKb@_@bAkEnIyC|Fq@fAqG|Lq@rAy@fBw@|Bc@`CGv@Az@DzCd@vHRvDJn@RlCP|CXtFBxBI~AWdBWz@c@jAg@z@y@jAq@r@cAr@mAp@mAd@_D`A{E`Bo@TqAf@cBv@_IxEaGfDiC~AmBdAsAj@sAf@mGzBoDjAmBr@yAx@y@l@u@x@a@j@a@v@_@|@a@pAI`@_@dCu@~FYxBc@tCk@vC{AzFM`AOdBClA@`C?dAG~BUbBe@rBmA`DiA|CgAlCm@tAoAlCoBrDg@r@i@p@kAbAk@\\y@b@{DdBoF`CqErByAr@aBhAo@n@}D~EgHpJmHnKsBtCoGnJoC`EQXsApCM`@g@vBAF[bCKjB?zB?bCCrAEl@m@dF]rBSvAKrAGvBNzABl@TxAZbCf@`Eh@hE^pBb@|Cr@hCjAnEp@`C|@hDtAhFvCrKrAjFr@pChA|CnBhFz@hAj@fAfAlCz@vCe@VEU]uAC]DUNYU]WHSIU?cAs@KO?GSHs@^FR',
      },
    ],
  },
];
