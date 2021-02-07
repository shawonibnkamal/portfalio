<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class SitemapController extends Controller
{
    public function sitemap() {
    $xml = '<?xml version="1.0" encoding="UTF-8"?>'.PHP_EOL;

$xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'.PHP_EOL;

    $xml .= '<url>'.PHP_EOL;
        $xml .= '<loc>https://portfal.io/</loc>'.PHP_EOL;
        $xml .= '<changefreq>weekly</changefreq>'.PHP_EOL;
        $xml .= '</url>'.PHP_EOL;

    $users = User::all();

    foreach($users as $user) {
    $xml .= '<url>'.PHP_EOL;
        $xml .= '<loc>https://portfal.io/'.$user->username.'/</loc>'.PHP_EOL;
        $xml .= '<changefreq>weekly</changefreq>'.PHP_EOL;
        $xml .= '</url>'.PHP_EOL;
    }

    $xml .= '</urlset>'.PHP_EOL;

return $xml;
}
}