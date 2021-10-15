import { Migration } from '@mikro-orm/migrations';

export class Migration20211015132111 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "gate" ("id" serial primary key, "name" text not null, "location_lat" float not null, "location_lon" float not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('create table "camp" ("id" serial primary key, "name" text not null, "location_lat" float not null, "location_lon" float not null, "size" int2 not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
  }

}
