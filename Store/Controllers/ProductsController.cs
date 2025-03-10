﻿using AutoMapper;
using DTO;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Services;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        IProductService productService;
        IMapper _imapper;
        private readonly ILogger<ProductsController> _logger;

        public ProductsController(IProductService productservice, IMapper _imapper, ILogger<ProductsController> logger)
        {
            this._logger = logger;
            this._imapper = _imapper;
            this.productService = productservice;
        }

        // GET: api/<ProductsController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> Get([FromQuery]int position, [FromQuery] int skip, [FromQuery] string? desc, [FromQuery] int? minPrice, [FromQuery] int? maxPrice,
           [FromQuery] int?[] categoryIds)
        {
            IEnumerable<Product> products = await productService.Get(position, skip, desc, minPrice, maxPrice, categoryIds);
            IEnumerable<ProductDTO> productsDTO = _imapper.Map<IEnumerable<Product>, IEnumerable<ProductDTO>>(products);
            if(productsDTO != null)
            {
                _logger.LogInformation($"------------------The application load successfully----------------------");
                return Ok(productsDTO);
            }
            return NoContent();
        }

        
    }
}
