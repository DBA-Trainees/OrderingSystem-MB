﻿using Abp.AutoMapper;
using OrderSystem.Categories.Dto;
using OrderSystem.Entities;
using OrderSystem.FoodTypes.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderSystem.Foods.Dto
{
    [AutoMapTo(typeof(Food))]
    public class CreateFoodDto
    {
        public byte[] Image { get; set; }
        public string ImageName { get; set; }
        public string ImageFileType { get; set; }
        public string Name { get; set; }
        public bool? Availability { get; set; }
        public int Quantity { get; set; }
        public string? Size { get; set; }
        public double Price { get; set; }
        public int CategoryId { get; set; }
      //  public CategoriesDto Category { get; set; }
        public int FoodTypeId { get; set; }
        //  public FoodTypeDto FoodType { get; set; }

        public int FoodId { get; set; }
    }
}
