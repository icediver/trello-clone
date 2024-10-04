import { Card, List } from '@prisma/client';

export type ListWithCardsType = List & { cards: Card[] };

export type CardWithListType = Card & { list: List };
