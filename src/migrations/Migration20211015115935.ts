import { Migration } from '@mikro-orm/migrations';

export class Migration20211015115935 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "animal" add column "color_light" text not null, add column "color_dark" text not null;');

    this.addSql('alter table "user" add constraint "user_id_unique" unique ("id");');
  }

}
