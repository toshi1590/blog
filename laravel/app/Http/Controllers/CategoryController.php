<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    function index () {        
        $categories = Category::all();
        return $categories->toJson();
    }

    function post (Request $request) {        
        $category = new Category();
        $category->name = $request->input('name');
        $category->save();

        $categories_json = $this->index();
        return $categories_json;
    }   

    function update (Request $request, $id) {        
        $category = Category::find($id);    
        $category->name = $request->input('name');
        $category->save();
        
        $categories_json = $this->index();
        return $categories_json;
    }

    function delete (Request $request, $id) {        
        $category = Category::destroy($id);    
        $categories_json = $this->index();
        return $categories_json;
    }
}
