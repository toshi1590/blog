<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Draft;
use Illuminate\Support\Facades\DB;

class DraftController extends Controller
{
    function index () {
        $drafts = DB::select("SELECT drafts.id, drafts.title, drafts.content, drafts.category_id, drafts.image_id_for_thumbnail, 
            DATE_FORMAT(drafts.created_at, '%Y/%m/%d') as created_at, categories.name as category, 
            images.name as thumbnail FROM drafts left join categories on drafts.category_id = categories.id 
            left join images on drafts.image_id_for_thumbnail = images.id order by drafts.created_at desc"
        );

        return json_encode($drafts);
    }

    function post (Request $request) {
        $draft = new Draft();
        $draft->title = $request->input('title');
        $draft->content = $request->input('content');
        $draft->category_id = $request->input('category_id');
        $draft->image_id_for_thumbnail = $request->input('image_id_for_thumbnail');
        $draft->save();

        $drafts_json = $this->index();
        return $drafts_json;
    }

    function update (Request $request, $id) {
        $draft = Draft::find($id);
        $draft->title = $request->input('title');
        $draft->content = $request->input('content');
        $draft->category_id = $request->input('category_id');
        $draft->image_id_for_thumbnail = $request->input('image_id_for_thumbnail');
        $draft->save();

        $drafts_json = $this->index();
        return $drafts_json;
    }
    
    function delete (Request $request, $id) {
        $draft = Draft::destroy($id);

        $drafts_json = $this->index();
        return $drafts_json;
    }
}
