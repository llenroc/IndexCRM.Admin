﻿using System.Collections.Generic;
using Abp.Application.Services.Dto;
using IndexCRM.Admin.Configuration.Tenants.Dto;

namespace IndexCRM.Admin.Web.Areas.Mpa.Models.Settings
{
    public class SettingsViewModel
    {
        public TenantSettingsEditDto Settings { get; set; }
        
        public List<ComboboxItemDto> TimezoneItems { get; set; }
    }
}