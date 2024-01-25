@extends('layouts.admin')
@section('content')
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>Thêm danh mục</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active">Blank Page</li>
                        </ol>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>

        <!-- Main content -->
        <section class="content">

            <!-- Default box -->
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-12 text-right">
                            <button type="submit" class="btn btn-sm btn-primary">
                                <i class="fas fa-save"></i>Lưu[Thêm]
                            </button>
                            <a href="" class="btn btn-sm btn-success">
                                <i class="fas fa-plus">Quay về danh sách</i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body">

            </div>
            <!-- /.card-body -->
            <div class="card-footer">
                <div class="row">
                    Footer
                </div>
                <!-- /.card-footer-->
            </div>
            <!-- /.card -->

        </section>
        <!-- /.content -->
    </div>
@endsection
