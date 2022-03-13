let product = 0;

function displayCategoryList() {
    window.open("category.html", "_self");
}

function displayFormCreate() {
    document.getElementById("form").reset();
    document.getElementById("form").hidden = false;
    document.getElementById("form-button").onclick = function () {
        addNewProduct();
    }
}

function showCategories() {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/categories`,
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += showCategory(data[i]);
            }
            document.getElementById("category").innerHTML = content;
        }
    });
}

function showCategory(category) {
    return `<option value="${category.id}">${category.name}</option>`
}

function addNewProduct() {
    //lấy dữ liệu
    let data = new FormData();
    let name = $('#name').val();
    let price = $('#price').val();
    let description = $('#description').val();
    let category = $('#category').val();
    let newProduct = {
        name: name,
        price: price,
        description: description,
        category: {
            id: category
        }
    };

    data.append("file", $('#image')[0].files[0]);
    data.append("product", new Blob([JSON.stringify(newProduct)], {
        type: "application/json"
    }))

    //gọi ajax
    $.ajax({
        type: "POST",
        data: data,
        processData: false,
        contentType: false,
        //tên API
        url: `http://localhost:8080/api/products`,
        //xử lý khi thành công
        success: function () {
            getProducts();
        }

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function getProducts() {
    $.ajax({
        type: "GET",
        //tên API
        url: `http://localhost:8080/api/products`,
        //xử lý khi thành công
        success: function (data) {
            // hiển thị danh sách ở đây
            let content = '<tr>\n' +
                '<th>Name</th>\n' +
                '<th>Price</th>\n' +
                '<th>Description</th>\n' +
                '<th>Image</th>\n' +
                '<th>Category</th>\n' +
                '<th colspan="2">Action</th>\n' +
                '</tr>';
            for (let i = 0; i < data.length; i++) {
                content += displayProduct(data[i]);
            }
            // document.getElementById("studentList").hidden = false;
            document.getElementById("productList").innerHTML = content;
            document.getElementById("form").hidden = true;
        }
    });
}

function displayProduct(product) {
    return `<tr><td>${product.name}</td><td>${product.price}</td><td>${product.description}</td><td><img src="${product.imageUrl}" alt=""></td><td>${product.category.name}</td>
                    <td><button class="btn btn-danger" onclick="deleteProduct(${product.id})"><i class="fa-solid fa-trash"></i></button></td>
                    <td><button class="btn btn-warning" onclick="editProduct(${product.id})"><i class="fa-solid fa-pencil"></i></button></td></tr>`;
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete ?') === true) {
        $.ajax({
            type: 'DELETE',
            url: `http://localhost:8080/api/products/${id}`,
            success: function () {
                getProducts()
            }
        });
    }
}

function editProduct(id) {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/api/products/${id}`,
        success: function (data) {
            $('#name').val(data.name);
            $('#price').val(data.price);
            $('#description').val(data.description);
            // $('#image').val(data.imageUrl);
            $('#category').val(data.category.id);
            product = data.id;
            document.getElementById("form").hidden = false;
            document.getElementById("form-button").onclick = function () {
                updateProduct()
            };
        }
    });
}

function updateProduct() {
    let data = new FormData();
    let name = $('#name').val();
    let price = $('#price').val();
    let description = $('#description').val();
    let category = $('#category').val();
    let newProduct = {
        name: name,
        price: price,
        description: description,
        category: {
            id: category
        }
    };

    data.append("file", $('#image')[0].files[0]);
    data.append("product", new Blob([JSON.stringify(newProduct)], {
        type: "application/json"
    }))

    //gọi ajax
    $.ajax({
        type: "PUT",
        data: data,
        processData: false,
        contentType: false,
        //tên API
        url: `http://localhost:8080/api/products/${product}`,
        //xử lý khi thành công
        success: function () {
            getProducts();
        }

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function searchProduct() {
    let search = document.getElementById('search').value;
    $.ajax({
        type: "GET",
        //tên API
        url: `http://localhost:8080/api/products?search=${search}`,
        //xử lý khi thành công
        success: function (data) {
            // hiển thị danh sách ở đây
            let content = '<tr>\n' +
                '<th>Name</th>\n' +
                '<th>Price</th>\n' +
                '<th>Description</th>\n' +
                '<th>Image</th>\n' +
                '<th>Category</th>\n' +
                '<th colspan="2">Action</th>\n' +
                '</tr>';
            for (let i = 0; i < data.length; i++) {
                content += displayProduct(data[i]);
            }
            document.getElementById("productList").innerHTML = content;
            document.getElementById("search-form").reset();
        }
    });
    event.preventDefault();
}

showCategories()
getProducts()