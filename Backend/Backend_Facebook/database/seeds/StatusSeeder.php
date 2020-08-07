<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        for($i = 0; $i< 5; $i++){
            DB::table('statuses')->insert([
                'user_id' => $faker->numberBetween($min = 1, $max = 6),
                'image' => 'storage/public/46-38-4-7-8-2020.png',
                'content' => $faker->text
            ]);
        }

    }
}
