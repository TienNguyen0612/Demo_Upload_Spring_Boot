package codegym.repository;

import codegym.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface IProductRepository extends JpaRepository<Product, Long> {
    Iterable<Product> findAllByNameContaining(String name);

    Iterable<Product> findAllByCategory_Id(Long id);

    void deleteAllByCategory_Id(Long id);
}
