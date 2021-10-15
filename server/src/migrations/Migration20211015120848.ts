import { Migration } from '@mikro-orm/migrations';

export class Migration20211015120848 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "animal" add column "color_color_scheme" text null;');
  }

}
