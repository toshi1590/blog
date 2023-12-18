<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use Illuminate\Support\Facades\DB;

class ArticleController extends Controller
{
    function index () {
        $articles = DB::select("SELECT articles.id, articles.title, articles.content, articles.category_id, articles.image_id_for_thumbnail, 
            DATE_FORMAT(articles.created_at, '%Y/%m/%d') as created_at, categories.name as category, 
            images.name as thumbnail FROM articles left join categories on articles.category_id = categories.id 
            left join images on articles.image_id_for_thumbnail = images.id order by articles.created_at desc"
        );

        return json_encode($articles);
    }

    function post (Request $request) {
        $article = new Article();
        $article->title = $request->input('title');
        $article->content = $request->input('content');
        $article->category_id = $request->input('category_id');
        $article->image_id_for_thumbnail = $request->input('image_id_for_thumbnail');
        $article->save();

        $articles_json = $this->index();
        return $articles_json;
    }

    function get_categories () {
        $categories = DB::select("select categories.name, count(*) as number from 
            articles left join categories on articles.category_id = categories.id group by categories.name"
        );
        return json_encode($categories); 
    }

    function get_months () {
        $months = DB::select("SELECT DATE_FORMAT(created_at, '%Y/%m') AS month, COUNT(*) AS record_count FROM articles GROUP BY month ORDER BY month desc");
        return json_encode($months);
    }

    function get_article_by_id_or_category ($id_or_category) {         
        // case of id
        if (preg_match('/^[0-9]+$/', $id_or_category)) {
            $article = DB::table('articles')
                ->join('categories', 'articles.category_id', '=', 'categories.id')
                ->join('images', 'articles.image_id_for_thumbnail', '=', 'images.id')
                ->where('articles.id', '=', $id_or_category)
                ->select('articles.*', 'categories.name as category', 'images.name as thumbnail')
                ->get();
            return $article->toJson();
        } 
        // case of category
        else {
            $articles = DB::table('articles')
                ->join('categories', 'articles.category_id', '=', 'categories.id')
                ->join('images', 'articles.image_id_for_thumbnail', '=', 'images.id')
                ->where('categories.name', '=', $id_or_category)
                ->select('articles.*', 'categories.name as category', 'images.name as thumbnail')
                ->orderBy('articles.created_at', 'desc')
                ->get();
            return $articles->toJson();

            // $articles = DB::select("SELECT articles.id, articles.title, articles.content, categories.name as category,
            //     articles.thumbnail_url, DATE_FORMAT(articles.created_at, '%Y/%m/%d') as created_at
            //     FROM articles left join categories on articles.category_id = categories.id where categories.name = $id_or_category
            //     order by articles.created_at desc"
            // );

            // return json_encode($articles); 
        }
    }

    function update (Request $request, $id) {
        $article = Article::find($id);
        $article->title = $request->input('title');
        $article->content = $request->input('content');
        $article->category_id = $request->input('category_id');
        $article->image_id_for_thumbnail = $request->input('image_id_for_thumbnail');
        $article->save();

        $articles_json = $this->index();
        return $articles_json;
    }

    function delete (Request $request, $id) {
        $article = Article::destroy($id);

        $articles_json = $this->index();
        return $articles_json;
    }

    function get_articles_by_year_month ($year, $month) {
        $articles = DB::table('articles')
                ->join('categories', 'articles.category_id', '=', 'categories.id')
                ->join('images', 'articles.image_id_for_thumbnail', '=', 'images.id')
                ->whereBetween('articles.created_at', [$year . '-' . $month . '-1', $year . '-' . $month . '-31'])
                ->select('articles.*', 'categories.name as category', 'images.name as thumbnail')
                ->orderBy('articles.created_at', 'desc')
                ->get();
        return $articles->toJson();
    }
}
