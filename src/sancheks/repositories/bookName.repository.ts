import { CustomRepository } from "src/typeorm-ex/typeorm-ex.decorator";

import { Repository } from "typeorm";
import { BookName } from "../entities/book-name.entity";

@CustomRepository(BookName)
export class BookNameRepository extends Repository<BookName> {
  async getOrCreate(name: String): Promise<BookName> {
    const bookTitle = name.trim().toLowerCase().replace(/ +/g, " ");
    const bookNameSlug = bookTitle.replace(/ /g, "-");
    let bookName = await this.findOne({
      where: { slug: bookNameSlug },
    });
    if (!bookName) {
      bookName = await this.save(
        this.create({ slug: bookNameSlug, title: bookTitle })
      );
    }
    return bookName;
  }
}
