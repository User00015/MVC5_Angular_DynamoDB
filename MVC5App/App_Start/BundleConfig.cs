﻿using System.Web.Optimization;

namespace MVC5App
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/bootstrap.min.js",
                "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/bower_components/angular/angular.js",
                "~/bower_components/angular-resource/angular-resource.js",
                "~/Scripts/ng-map.min.js",
                "~/bower_components/angular-environment/dist/angular-environment.js",
                "~/Scripts/smart-table.min.js",
                "~/bower_components/angular-animate/angular-animate.min.js",
                "~/bower_components/angular-route/angular-route.js"));

            bundles.Add(new ScriptBundle("~/bundles/angularapp").Include(
                "~/Angular/*.js").IncludeDirectory(
                "~/Angular", "*.js", true));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));


            bundles.Add(new ScriptBundle("~/bundles/extensions").Include(
                "~/bower_components/angular-responsive-tables/release/angular-responsive-tables.min.js",
                "~/bower_components/angular-animate/angular-animate.min.js",
                "~/bower_components/a0-angular-storage/dist/angular-storage.min.js",
                "~/bower_components/angular-jwt/dist/angular-jwt.min.js",
                "~/bower_components/angular-strap/dist/angular-strap.min.js",
                "~/bower_components/angular-strap/dist/angular-strap.tpl.min.js",
                "~/bower_components/auth0-lock/build/lock.min.js",
                "~/bower_components/angular-lock/dist/angular-lock.min.js",
                "~/Scripts/mixins/lodash.js",
                "~/Scripts/lodash.min.js"));


            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/final.min.css",
                      "~/Content/animate.css",
                      "~/bower_components/angular-responsive-tables/release/angular-responsive-tables.css",
                      "~/Content/site.css"));


            BundleTable.EnableOptimizations = false;
        }
    }
}
