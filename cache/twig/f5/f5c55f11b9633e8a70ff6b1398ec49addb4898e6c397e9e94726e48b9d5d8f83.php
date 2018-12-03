<?php

/* partials/header.html.twig */
class __TwigTemplate_791a14829a2c97c8bf965f6cfa8b06ad32af890eef136c599d98841e937667f9 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<header>
    <div class=\"container\">
        <div class=\"logoWrap\">
            ";
        // line 5
        echo "            <a href=\"";
        echo ($context["base_url"] ?? null);
        echo "\"><img src=\"";
        echo ($context["base_url"] ?? null);
        echo "/images/logo-subutai-web-mono-white.png\"></a>
        </div>
        <div class=\"menuWrap\">
            <nav id=\"socialNav\">
                <ul>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-youtube\"></i></a>
                    </li>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-linkedin-in\"></i></a>
                    </li>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-reddit-alien\"></i></a>
                    </li>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-twitter\"></i></a>
                    </li>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-telegram-plane\"></i></a>
                    </li>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-slack-hash\"></i></a>
                    </li>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-facebook-f\"></i></a>
                    </li>
                </ul>
            </nav>
            <nav id=\"mainMenu\" class=\"topNav\">

                ";
        // line 36
        echo "                <div class=\"dropdown\">
                    <button class=\"dropbtn\">Products <i class=\"fa fa-caret-down\"></i></button>
                    <div class=\"dropdown-content\">
                    <a href=\"";
        // line 39
        echo ($context["base_url"] ?? null);
        echo "/products/subutai-router\">Router</a>
                    <a href=\"";
        // line 40
        echo ($context["base_url"] ?? null);
        echo "/products/subutai-peeros\">PeerOS</a>
                    <a href=\"";
        // line 41
        echo ($context["base_url"] ?? null);
        echo "/products/subutai-bazaar\">Bazaar</a>
                    <a href=\"";
        // line 42
        echo ($context["base_url"] ?? null);
        echo "/products/subutai-blueprints\">Blueprints</a>
                    <a href=\"";
        // line 43
        echo ($context["base_url"] ?? null);
        echo "/products/khan\">KHAN</a>
                    </div>
                </div>
                <div class=\"dropdown\">
                    <button class=\"dropbtn\">About <i class=\"fa fa-caret-down\"></i></button>
                    <div class=\"dropdown-content\">
                    <a href=\"";
        // line 49
        echo ($context["base_url"] ?? null);
        echo "/about/leadership\">Leadership</a>
                    <a href=\"";
        // line 50
        echo ($context["base_url"] ?? null);
        echo "/about/team\">Team</a>
                    </div>
                </div>
                <a href=\"";
        // line 53
        echo ($context["base_url"] ?? null);
        echo "/getting-started\">Getting Started</a>
                <a href=\"#contact\">Documentation</a>
                <div class=\"dropdown\">
                    <button class=\"dropbtn\">Ideation <i class=\"fa fa-caret-down\"></i></button>
                    <div class=\"dropdown-content\">
                    <a href=\"#\">Blog</a>
                    <a href=\"#\">Hardware Security</a>
                    <a href=\"";
        // line 60
        echo ($context["base_url"] ?? null);
        echo "/ideation/p2p-cloud\">P2P Cloud</a>
                    </div>
                </div>
                <a href=\"";
        // line 63
        echo ($context["base_url"] ?? null);
        echo "/contact\">Contact</a>
                <a href=\"javascript:void(0);\" class=\"icon\" onclick=\"myFunction()\">&#9776;</a>


                ";
        // line 93
        echo "                    ";
        // line 111
        echo "                ";
        // line 112
        echo "            </nav>
        </div>
    </div>
</header>";
    }

    public function getTemplateName()
    {
        return "partials/header.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  127 => 112,  125 => 111,  123 => 93,  116 => 63,  110 => 60,  100 => 53,  94 => 50,  90 => 49,  81 => 43,  77 => 42,  73 => 41,  69 => 40,  65 => 39,  60 => 36,  24 => 5,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("<header>
    <div class=\"container\">
        <div class=\"logoWrap\">
            {# <img src=\"user/pages/images/logo-subutai-web-mono-white.png\"> #}
            <a href=\"{{ base_url }}\"><img src=\"{{ base_url }}/images/logo-subutai-web-mono-white.png\"></a>
        </div>
        <div class=\"menuWrap\">
            <nav id=\"socialNav\">
                <ul>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-youtube\"></i></a>
                    </li>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-linkedin-in\"></i></a>
                    </li>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-reddit-alien\"></i></a>
                    </li>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-twitter\"></i></a>
                    </li>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-telegram-plane\"></i></a>
                    </li>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-slack-hash\"></i></a>
                    </li>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-facebook-f\"></i></a>
                    </li>
                </ul>
            </nav>
            <nav id=\"mainMenu\" class=\"topNav\">

                {# <div class=\"topnav\" id=\"myTopnav\"> #}
                <div class=\"dropdown\">
                    <button class=\"dropbtn\">Products <i class=\"fa fa-caret-down\"></i></button>
                    <div class=\"dropdown-content\">
                    <a href=\"{{ base_url }}/products/subutai-router\">Router</a>
                    <a href=\"{{ base_url }}/products/subutai-peeros\">PeerOS</a>
                    <a href=\"{{ base_url }}/products/subutai-bazaar\">Bazaar</a>
                    <a href=\"{{ base_url }}/products/subutai-blueprints\">Blueprints</a>
                    <a href=\"{{ base_url }}/products/khan\">KHAN</a>
                    </div>
                </div>
                <div class=\"dropdown\">
                    <button class=\"dropbtn\">About <i class=\"fa fa-caret-down\"></i></button>
                    <div class=\"dropdown-content\">
                    <a href=\"{{ base_url }}/about/leadership\">Leadership</a>
                    <a href=\"{{ base_url }}/about/team\">Team</a>
                    </div>
                </div>
                <a href=\"{{ base_url }}/getting-started\">Getting Started</a>
                <a href=\"#contact\">Documentation</a>
                <div class=\"dropdown\">
                    <button class=\"dropbtn\">Ideation <i class=\"fa fa-caret-down\"></i></button>
                    <div class=\"dropdown-content\">
                    <a href=\"#\">Blog</a>
                    <a href=\"#\">Hardware Security</a>
                    <a href=\"{{ base_url }}/ideation/p2p-cloud\">P2P Cloud</a>
                    </div>
                </div>
                <a href=\"{{ base_url }}/contact\">Contact</a>
                <a href=\"javascript:void(0);\" class=\"icon\" onclick=\"myFunction()\">&#9776;</a>


                {# <ul>
                    {% macro nav_loop(page) %}
                        {% for p in page.children.visible %}
                            {% set active_page = (p.active or p.activeChild) ? 'active' : '' %}
                            {% if p.children.visible.count > 0 %}
                                <li>
                                    <a href=\"{{ p.url }}\" class=\"{{ active_page }}\">
                                        {{ p.menu }}
                                    </a>
                                    <ul>
                                        {{ _self.nav_loop(p) }}
                                    </ul>
                                </li>
                            {% else %}
                                <li>
                                    <a href=\"{{ p.url }}\" class=\"{{ active_page }}\">
                                        {{ p.menu }}
                                    </a>
                                </li>
                            {% endif %}
                        {% endfor %}
                    {% endmacro %}

                    <ul {{ tree ? 'class=\"tree\"' : '' }}>
                        {{ _self.nav_loop(pages) }}
                    </ul> #}
                    {# <li>
                        <a href=\"#\">Products</a>
                    </li>
                    <li>
                        <a href=\"#\">About</a>
                    </li>
                    <li>
                        <a href=\"#\">Getting Started</a>
                    </li>
                    <li>
                        <a href=\"#\">Documentation</a>
                    </li>
                    <li>
                        <a href=\"#\">Ideation</a>
                    </li>
                    <li>
                        <a href=\"#\">Contact</a>
                    </li> #}
                {# </ul> #}
            </nav>
        </div>
    </div>
</header>", "partials/header.html.twig", "/Users/fernandoted/Sites/subutai/website/user/themes/subutai/templates/partials/header.html.twig");
    }
}
