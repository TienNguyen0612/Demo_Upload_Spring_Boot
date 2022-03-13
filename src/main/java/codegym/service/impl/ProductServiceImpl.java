package codegym.service.impl;

import codegym.model.Product;
import codegym.repository.IProductRepository;
import codegym.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductServiceImpl implements IProductService {
    @Autowired
    private IProductRepository iProductRepository;

    @Override
    public Iterable<Product> findAll() {
        return iProductRepository.findAll();
    }

    @Override
    public Optional<Product> findById(Long id) {
        return iProductRepository.findById(id);
    }

    @Override
    public Product save(Product product) {
        return iProductRepository.save(product);
    }

    @Override
    public void remove(Long id) {
        iProductRepository.deleteById(id);
    }

    @Override
    public Iterable<Product> findAllByName(String name) {
        return iProductRepository.findAllByNameContaining(name);
    }

    @Override
    public Iterable<Product> findAllByCategory_Id(Long id) {
        return iProductRepository.findAllByCategory_Id(id);
    }

    @Override
    public void deleteAllByCategory_Id(Long id) {
        iProductRepository.deleteAllByCategory_Id(id);
    }
}
