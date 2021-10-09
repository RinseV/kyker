import { Migration } from '@mikro-orm/migrations';

export class Migration20211009203716 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');

    this.addSql('create table "pin" ("id" serial primary key, "user_id" text not null, "animal" text check ("animal" in (\'Lion\', \'Leopard\', \'Cheetah\', \'Wild Dog\', \'Hyena\', \'Buffalo\', \'Hippo\', \'Elephant\', \'Giraffe\', \'Zebra\', \'Rhino\')) not null, "location_lat" float not null, "location_lon" float not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('alter table "pin" add constraint "pin_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

}
