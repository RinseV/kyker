import { Migration } from '@mikro-orm/migrations';

export class Migration20211015101312 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "animal" ("id" serial primary key, "name" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('create table "user" ("id" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');

    this.addSql('create table "spotting" ("id" serial primary key, "user_id" text not null, "location_lat" float not null, "location_lon" float not null, "animal_id" int4 not null, "description" text null, "image_id" text null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('alter table "spotting" add constraint "spotting_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "spotting" add constraint "spotting_animal_id_foreign" foreign key ("animal_id") references "animal" ("id") on update cascade;');
  }

}
