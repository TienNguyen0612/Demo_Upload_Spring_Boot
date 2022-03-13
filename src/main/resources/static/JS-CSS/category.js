let index = 0;

function displayProductList() {
    window.open("product.html", "_self");
}

function getCategories() {
    $.ajax({
        type: "GET",
        //tên API
        url: `http://localhost:8080/api/categories`,
        //xử lý khi thành công
        success: function (data) {
            // hiển thị danh sách ở đây
            let content = '<tr>\n' +
                '<th>Name</th>\n' +
                '<th colspan="3">Action</th>\n' +
                '</tr>';
            for (let i = 0; i < data.length; i++) {
                content += displayCategory(data[i]);
            }
            document.getElementById("categoryList").innerHTML = content;
            document.getElementById("form").hidden = true;
        }
    });
}

function displayCategory(category) {
    return `<tr><td>${category.name}</td>
                    <td><button class="btn btn-danger" onclick="deleteCategory(${category.id})"><i class="fa-solid fa-trash"></i></button></td>
                    <td><button class="btn btn-warning" onclick="editCategory(${category.id})"><i class="fa-solid fa-pencil"></i></button></td>
                    <td><button class="btn btn-warning" onclick="detailCategory(${category.id})"><i class="fa-solid fa-info"></i></button></td></tr>`;
}

function displayFormCreate() {
    document.getElementById("form").reset()
    document.getElementById("form").hidden = false;
    document.getElementById("form-button").onclick = function () {
        addNewCategory();
    }
}

function addNewCategory() {
    //lấy dữ liệu
    let name = $('#name').val();
    let newCategory = {
        name: name
    };

    //gọi ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newCategory),
        //tên API
        url: `http://localhost:8080/api/categories`,
        //xử lý khi thành công
        success: function () {
            getCategories();
        }

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function deleteCategory(id) {
    if (confirm('Are you sure you want to delete ?') === true) {
        $.ajax({
            type: 'DELETE',
            url: `http://localhost:8080/api/categories/${id}`,
            success: function () {
                getCategories()
            }
        });
    }
}

function editCategory(id) {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/api/categories/${id}`,
        success: function (data) {
            $('#name').val(data.name);
            index = data.id;
            document.getElementById("form").hidden = false;
            document.getElementById("form-button").onclick = function () {
                updateCategory()
            };
        }
    });
}

function updateCategory() {
    let name = $('#name').val();
    let newCategory = {
        name: name
    };

    //gọi ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: 'PUT',
        data: JSON.stringify(newCategory),
        //tên API
        url: `http://localhost:8080/api/categories/${index}`,
        //xử lý khi thành công
        success: function () {
            getCategories();
        }

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function detailCategory(id) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/categories/view/${id}`,
        success: function (data) {
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
            document.getElementById("productList").hidden = false;
            document.getElementById("productList").innerHTML = content;
        }
    });
}

function displayProduct(product) {
    return `<tr><td>${product.name}</td><td>${product.price}</td><td>${product.description}</td><td><img src="${product.imageUrl}" alt=""></td><td>${product.category.name}</td>
                    <td><button class="btn btn-danger" onclick="deleteProduct(${product.id})"><i class="fa-solid fa-trash"></i></button></td>
                    <td><button class="btn btn-warning" onclick="editProduct(${product.id})"><i class="fa-solid fa-pencil"></i></button></td></tr>`;
}



getCategories()