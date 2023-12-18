<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\Image;
use Illuminate\Support\Facades\DB;

class ImageController extends Controller
{
    function index () {
        $images = Image::all();
        return json_encode($images);
    }

    function post (Request $request) {
        $file = $request->file('image');
        $file_name = $file->getClientOriginalName();
        Storage::putFileAs('public/', $file, $file_name);

        $image = new Image();
        $image->name = $file_name;
        $image->save();

        $images = $this->index();
        return $images;
    }

    function return_image ($id) {
        $image = Image::find($id);
        return response()->file(Storage::path("public/" . $image->name));
    }

    function update (Request $request, $id) {
        $image = Image::find($id);
        Storage::move("public/" . $image->name, "public/" . $request->input('name')); 

        $image->name = $request->input('name');
        $image->save();

        $images = $this->index();
        return $images;
    }

    function delete ($id) {
        $image = Image::find($id);
        Storage::delete("public/" . $image->name);
        
        $image = Image::destroy($id);

        $images = $this->index();
        return $images;
    }
}
