<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Mạnh Phạm',
            'gender' => 'Nam',
            'birthday' => '22/12/2000',
            'image' => 'https://gamek.mediacdn.vn/133514250583805952/2020/1/16/1-15791579653801179133828.png',

            'username' => 'Admin',
            'password' => Hash::make('123'),
            'route' => 'Admin',
        ]);

        for ($i=0; $i < 5; $i++) {
            $gender = "Nam";
            if($i % 2 == 0){
                $gender = "Nu";
            }
            DB::table('users')->insert([
                'name' => Str::random(6),
                'gender' => $gender,
                'birthday' => '11/11/2011',
                'image' => 'https://gamek.mediacdn.vn/133514250583805952/2020/1/16/1-15791579653801179133828.png',

                'username' => Str::random(5),
                'password' => Hash::make('password'),
                'route' => 'User',
            ]);
        }
    }
}
