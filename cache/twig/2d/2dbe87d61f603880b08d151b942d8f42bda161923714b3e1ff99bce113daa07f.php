<?php

/* partials/base.html.twig */
class __TwigTemplate_aeacb3dbfcfe147a7c18f5b039f0308f770a5b34cfacbdb2ac8b6e8d26f991c0 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
            'head' => array($this, 'block_head'),
            'stylesheets' => array($this, 'block_stylesheets'),
            'javascripts' => array($this, 'block_javascripts'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<!DOCTYPE html>
<html lang=\"";
        // line 2
        echo (($this->getAttribute($this->getAttribute(($context["grav"] ?? null), "language", array()), "getActive", array())) ? ($this->getAttribute($this->getAttribute(($context["grav"] ?? null), "language", array()), "getActive", array())) : ($this->getAttribute($this->getAttribute($this->getAttribute(($context["grav"] ?? null), "config", array()), "site", array()), "default_lang", array())));
        echo "\">
<head>
";
        // line 4
        $this->displayBlock('head', $context, $blocks);
        // line 38
        echo "</head>

<body class=\"";
        // line 40
        echo $this->getAttribute($this->getAttribute(($context["page"] ?? null), "header", array()), "body_classes", array());
        echo "\">

";
        // line 42
        $this->loadTemplate("partials/header.html.twig", "partials/base.html.twig", 42)->display($context);
        // line 43
        echo "
";
        // line 44
        echo $this->getAttribute(($context["page"] ?? null), "content", array());
        echo "

";
        // line 46
        $this->loadTemplate("partials/footer.html.twig", "partials/base.html.twig", 46)->display($context);
        // line 47
        echo "
<script>
// read more
function readMore_manifesto() {
    moreText_manifesto = document.getElementById(\"moreManifesto\");
    btnMore1 = document.getElementById(\"btnMore_manifesto\");
    if (moreText_manifesto.style.display === \"block\") {
        moreText_manifesto.style.display = \"none\";
        btnMore1.innerHTML = \"Read More\";
    } else {
        moreText_manifesto.style.display = \"block\";
        btnMore1.innerHTML = \"Read Less\";
    }
}
function readMore_tribute() {
    moreText_tribute = document.getElementById(\"moreTribute\");
    btnMore2 = document.getElementById(\"btnMore_tribute\");
    if (moreText_tribute.style.display === \"block\") {
        moreText_tribute.style.display = \"none\";
        btnMore2.innerHTML = \"Read More\";
    } else {
        moreText_tribute.style.display = \"block\";
        btnMore2.innerHTML = \"Read Less\";
    }
}
</script>

</body>

</html>";
    }

    // line 4
    public function block_head($context, array $blocks = array())
    {
        // line 5
        echo "    <meta charset=\"utf-8\" />
    <title>";
        // line 6
        if ($this->getAttribute(($context["header"] ?? null), "title", array())) {
            echo twig_escape_filter($this->env, $this->getAttribute(($context["header"] ?? null), "title", array()), "html");
            echo " | ";
        }
        echo twig_escape_filter($this->env, $this->getAttribute(($context["site"] ?? null), "title", array()), "html");
        echo "</title>

    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
    ";
        // line 11
        echo "
    ";
        // line 13
        echo "    ";
        // line 14
        echo "
    ";
        // line 15
        $this->displayBlock('stylesheets', $context, $blocks);
        // line 24
        echo "    ";
        echo $this->getAttribute(($context["assets"] ?? null), "css", array(), "method");
        echo "
    <link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.5.0/css/all.css\" integrity=\"sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU\" crossorigin=\"anonymous\">
    <link href=\"https://fonts.googleapis.com/css?family=Maven+Pro:400,500,700,900\" rel=\"stylesheet\">
    <link rel=\"stylesheet\" href=\"https://use.typekit.net/qgr7mna.css\">
    ";
        // line 28
        $this->displayBlock('javascripts', $context, $blocks);
        // line 35
        echo "    ";
        echo $this->getAttribute(($context["assets"] ?? null), "js", array(), "method");
        echo "

";
    }

    // line 15
    public function block_stylesheets($context, array $blocks = array())
    {
        // line 16
        echo "        ";
        // line 19
        echo "        ";
        $this->getAttribute(($context["assets"] ?? null), "addCss", array(0 => "theme://css/reset.css"), "method");
        // line 20
        echo "        ";
        $this->getAttribute(($context["assets"] ?? null), "addCss", array(0 => "theme://css-compiled/style.css"), "method");
        // line 21
        echo "        ";
        // line 23
        echo "    ";
    }

    // line 28
    public function block_javascripts($context, array $blocks = array())
    {
        // line 29
        echo "        ";
        $this->getAttribute(($context["assets"] ?? null), "addJs", array(0 => "jquery", 1 => 101), "method");
        // line 30
        echo "        ";
        $this->getAttribute(($context["assets"] ?? null), "addJs", array(0 => "theme://js/jquery.treemenu.js", 1 => array("group" => "bottom")), "method");
        // line 31
        echo "        ";
        $this->getAttribute(($context["assets"] ?? null), "addJs", array(0 => "theme://js/site.js", 1 => array("group" => "bottom")), "method");
        // line 32
        echo "        ";
        $this->getAttribute(($context["assets"] ?? null), "addJs", array(0 => "theme://js/dropdown-menu.js"), "method");
        // line 33
        echo "        ";
        $this->getAttribute(($context["assets"] ?? null), "addJs", array(0 => "theme://js/tabs.js"), "method");
        // line 34
        echo "    ";
    }

    public function getTemplateName()
    {
        return "partials/base.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  166 => 34,  163 => 33,  160 => 32,  157 => 31,  154 => 30,  151 => 29,  148 => 28,  144 => 23,  142 => 21,  139 => 20,  136 => 19,  134 => 16,  131 => 15,  123 => 35,  121 => 28,  113 => 24,  111 => 15,  108 => 14,  106 => 13,  103 => 11,  92 => 6,  89 => 5,  86 => 4,  53 => 47,  51 => 46,  46 => 44,  43 => 43,  41 => 42,  36 => 40,  32 => 38,  30 => 4,  25 => 2,  22 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("<!DOCTYPE html>
<html lang=\"{{ grav.language.getActive ?: grav.config.site.default_lang }}\">
<head>
{% block head %}
    <meta charset=\"utf-8\" />
    <title>{% if header.title %}{{ header.title|e('html') }} | {% endif %}{{ site.title|e('html') }}</title>

    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
    {# {% include 'partials/metadata.html.twig' %} #}

    {# <link rel=\"icon\" type=\"image/png\" href=\"{{ url('theme://images/favicon.png') }}\" /> #}
    {# <link rel=\"canonical\" href=\"{{ page.url(true, true) }}\" /> #}

    {% block stylesheets %}
        {# {% do assets.addCss('theme://css-compiled/spectre'~compress) %}
        {% if theme_var('spectre.exp') %}{% do assets.addCss('theme://css-compiled/spectre-exp'~compress)  %}{% endif %}
        {% if theme_var('spectre.icons') %}{%  do assets.addCss('theme://css-compiled/spectre-icons'~compress) %}{% endif %} #}
        {% do assets.addCss('theme://css/reset.css') %}
        {% do assets.addCss('theme://css-compiled/style.css') %}
        {# {% do assets.addCss('theme://css/custom.css') %}
        {% do assets.addCss('theme://css/line-awesome.min.css') %} #}
    {% endblock %}
    {{ assets.css() }}
    <link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.5.0/css/all.css\" integrity=\"sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU\" crossorigin=\"anonymous\">
    <link href=\"https://fonts.googleapis.com/css?family=Maven+Pro:400,500,700,900\" rel=\"stylesheet\">
    <link rel=\"stylesheet\" href=\"https://use.typekit.net/qgr7mna.css\">
    {% block javascripts %}
        {% do assets.addJs('jquery', 101) %}
        {% do assets.addJs('theme://js/jquery.treemenu.js', {group:'bottom'}) %}
        {% do assets.addJs('theme://js/site.js', {group:'bottom'}) %}
        {% do assets.addJs('theme://js/dropdown-menu.js') %}
        {% do assets.addJs('theme://js/tabs.js') %}
    {% endblock %}
    {{ assets.js() }}

{% endblock head %}
</head>

<body class=\"{{ page.header.body_classes }}\">

{% include 'partials/header.html.twig' %}

{{ page.content }}

{% include 'partials/footer.html.twig' %}

<script>
// read more
function readMore_manifesto() {
    moreText_manifesto = document.getElementById(\"moreManifesto\");
    btnMore1 = document.getElementById(\"btnMore_manifesto\");
    if (moreText_manifesto.style.display === \"block\") {
        moreText_manifesto.style.display = \"none\";
        btnMore1.innerHTML = \"Read More\";
    } else {
        moreText_manifesto.style.display = \"block\";
        btnMore1.innerHTML = \"Read Less\";
    }
}
function readMore_tribute() {
    moreText_tribute = document.getElementById(\"moreTribute\");
    btnMore2 = document.getElementById(\"btnMore_tribute\");
    if (moreText_tribute.style.display === \"block\") {
        moreText_tribute.style.display = \"none\";
        btnMore2.innerHTML = \"Read More\";
    } else {
        moreText_tribute.style.display = \"block\";
        btnMore2.innerHTML = \"Read Less\";
    }
}
</script>

</body>

</html>", "partials/base.html.twig", "/Users/fernandoted/Sites/subutai/website/user/themes/subutai/templates/partials/base.html.twig");
    }
}
