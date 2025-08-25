// https://www.codewars.com/kata/515bb423de843ea99400000a/train/typescript
// node --watch pagination-helper.ts # Requires Node v24+

export class PaginationHelper<T extends any = any> {

  private totalPages = 0;

	constructor(
    private collection: T[],
    private itemsPerPage: number,
  ) {
    this.totalPages = this.calculatePages(collection.length, itemsPerPage);
	}

	itemCount(): number {
    return this.collection.length;
	}

	pageCount(): number {
    return this.totalPages;
	}

	pageItemCount(pageIndex: number) {
    const lastPage = this.totalPages - 1;

    if (pageIndex < 0 || pageIndex > lastPage) {
      return -1;
    }

    // Last page is shorter, calculate its items per page
    if (pageIndex === lastPage) {
      const itemsInFullPages = this.itemsPerPage * (this.totalPages - 1);
      return this.collection.length - itemsInFullPages;
    }

    return this.itemsPerPage;
	}

	pageIndex(itemIndex: number): number {

    const maxItemIndex = this.collection.length;
    const lastPage = this.totalPages - 1;

    // Out of bound
    if (itemIndex < 0 || itemIndex > maxItemIndex) {
      return -1;
    }

    // Loop on pages to check
    for (let pageIndex = 0; pageIndex < lastPage; pageIndex++) {
      const pageMaxIndex = (pageIndex + 1) * this.itemsPerPage;
      if (itemIndex < pageMaxIndex) {
        return pageIndex;
      }
    }

    // Given it's not out of bound, it MUST be on the last page
    return lastPage;
	}

  private calculatePages(totalItems: number, itemsPerPage: number): number {
    const ratio = totalItems / itemsPerPage;
    const pages = Math.floor(ratio);
    const lastShorterPage = (ratio > pages) ? 1 : 0;
    const totalPages = pages + lastShorterPage;
    return totalPages;
  }
}
